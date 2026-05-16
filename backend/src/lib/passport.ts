import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import prisma from './prisma';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'dummy',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'dummy',
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:5000/api/v1/auth/github/callback',
    scope: ['user:email']
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      // Find or create user in database
      let user = await prisma.user.findUnique({
        where: { githubId: profile.id }
      });

      if (!user) {
        // Check if user with same email exists
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        
        if (email) {
          user = await prisma.user.findUnique({ where: { email } });
        }

        if (user) {
          // Link github to existing account
          user = await prisma.user.update({
            where: { id: user.id },
            data: { githubId: profile.id }
          });
        } else {
          // Create new user
          user = await prisma.user.create({
            data: {
              email: email || `${profile.username}@github.com`,
              fullname: profile.displayName || profile.username,
              githubId: profile.id,
              avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
              passwordHash: await bcrypt.hash(`github:${profile.id}`, 10),
              emailVerifiedAt: new Date()
            }
          });
        }
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from './prisma';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'dummy',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'dummy',
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:5000/api/v1/auth/github/callback',
    scope: ['user:email']
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      let user = await prisma.user.findUnique({
        where: { githubId: profile.id }
      });

      if (!user) {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        if (email) {
          user = await prisma.user.findUnique({ where: { email } });
        }

        if (user) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { githubId: profile.id }
          });
        } else {
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

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'dummy',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/v1/auth/google/callback',
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      let user = await prisma.user.findUnique({
        where: { googleId: profile.id }
      });

      if (!user) {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        if (email) {
          user = await prisma.user.findUnique({ where: { email } });
        }

        if (user) {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { googleId: profile.id }
          });
        } else {
          user = await prisma.user.create({
            data: {
              email: email!,
              fullname: profile.displayName,
              googleId: profile.id,
              avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
              passwordHash: await bcrypt.hash(`google:${profile.id}`, 10),
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

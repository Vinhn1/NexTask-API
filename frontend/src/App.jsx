import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { AuthPage } from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Team from './pages/Team';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
import { ResetPassword } from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import SocialCallback from './pages/SocialCallback';
import HomePage from './pages/home/HomePage';
import { Toaster } from 'react-hot-toast';

import { ProjectProvider } from './contexts/ProjectContext';

function App() {
  return (
    // BrowserRouter phải bọc ngoài AuthProvider để useNavigate hoạt động trong context
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <ProjectProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
              <Route path='/auth' element={<AuthPage />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password/:token' element={<ResetPassword/>} />
              <Route path='/social-callback' element={<SocialCallback />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/tasks" element={<Tasks />}/>
                <Route path="/projects" element={<Projects />}/>
                <Route path="/analytics" element={<Analytics />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/team" element={<Team />}/>
              </Route>

              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ProjectProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App

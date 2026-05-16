import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { AuthPage } from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
import { ResetPassword } from './pages/ResetPassword';
import HomePage from './pages/home/HomePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    // BrowserRouter phải bọc ngoài AuthProvider để useNavigate hoạt động trong context
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/resetpass' element={<ResetPassword/>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/tasks" element={<Tasks />}/>
              <Route path="/projects" element={<Projects />}/>
              <Route path="/analytics" element={<Analytics />}/>
              <Route path="/profile" element={<Profile />}/>
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App

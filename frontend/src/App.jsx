import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthPage } from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import Analytics from './pages/Analytics';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
import { ResetPassword } from './pages/ResetPassword';
import HomePage from './pages/home/HomePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/resetpass' element={<ResetPassword/>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/tasks" element={<Tasks />}/>
            <Route path="/projects" element={<Projects />}/>
            <Route path="/analytics" element={<Analytics />}/>
          </Route>
          
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App

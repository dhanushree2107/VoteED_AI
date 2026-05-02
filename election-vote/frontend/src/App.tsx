import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LearnModule from './pages/LearnModule';
import Chatbot from './pages/Chatbot';
import QuizPage from './pages/QuizPage';
import SimulationPage from './pages/SimulationPage';
import AuditLogPage from './pages/AuditLogPage';
import ElectionLawsPage from './pages/ElectionLawsPage';
import PartyAnalysisPage from './pages/PartyAnalysisPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{ top: 24, right: 24, zIndex: 9999 }}
        toastOptions={{
          duration: 3500,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155',
            borderRadius: '12px',
            fontSize: '14px',
            padding: '12px 16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />
          <Route path="/dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/learn"      element={<ProtectedRoute><LearnModule /></ProtectedRoute>} />
          <Route path="/chat"       element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
          <Route path="/quiz"       element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/simulation" element={<ProtectedRoute><SimulationPage /></ProtectedRoute>} />
          <Route path="/audit"      element={<ProtectedRoute><AuditLogPage /></ProtectedRoute>} />
          <Route path="/laws"       element={<ProtectedRoute><ElectionLawsPage /></ProtectedRoute>} />
          <Route path="/parties"    element={<ProtectedRoute><PartyAnalysisPage /></ProtectedRoute>} />
          <Route path="/"           element={<Navigate to="/login" replace />} />
          <Route path="*"           element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

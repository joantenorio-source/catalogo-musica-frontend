import { Navigate } from 'react-router-dom';
import { isLogged } from '../services/authService';

function ProtectedRoute({ children }) {
  if (!isLogged()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
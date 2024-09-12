// ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  console.log('ProtectedRoute');

  const currentUser = useSelector((state) => state.user.currentUser);
  const token = localStorage.getItem('token');

  return currentUser && token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;

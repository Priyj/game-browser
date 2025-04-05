import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentUser } from '../features/librarySlice';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn && user) {
      dispatch(setCurrentUser(user.id));
    } else {
      dispatch(setCurrentUser(null));
    }
  }, [isSignedIn, user, dispatch]);

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User data:', userData); // Debugging line
            if (userData.role === 'admin') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } else {
            console.log('User document not found'); // Debugging line
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error checking admin status:', error); // Debugging line
          setIsAdmin(false);
        } finally {
          setCheckComplete(true);
        }
      } else {
        setCheckComplete(true);
      }
    };
    checkAdmin();
  }, [user]);

  if (loading || !checkComplete) return <div>Loading...</div>;

  if (!user || !isAdmin) {
    return <Navigate to="/login/admin" replace />;
  }

  return children;
};

export default AdminRoute;

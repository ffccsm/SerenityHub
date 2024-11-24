import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetMode, setIsResetMode] = useState(false); // Toggle for reset password
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and Password are required');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.role === 'admin') {
          toast.success('Admin logged in successfully', { position: 'top-center' });
          navigate('/admin/dashboard');
        } else {
          setError('Unauthorized access');
          toast.error('You do not have admin access.', { position: 'top-center' });
        }
      } else {
        setError('User document not found');
        toast.error('User document not found.', { position: 'top-center' });
      }
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setError('Invalid email or password');
        toast.error('Invalid email or password', { position: 'top-center' });
      } else {
        setError(`Login failed: ${error.message}`);
        toast.error(`Login failed: ${error.message}`, { position: 'top-center' });
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email to reset the password');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Check your inbox.', { position: 'top-center' });
      setIsResetMode(false); // Switch back to login mode after successful reset
    } catch (error) {
      toast.error(`Failed to send reset email: ${error.message}`, { position: 'top-center' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          {isResetMode ? 'Reset Password' : 'Admin Login'}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form
          onSubmit={isResetMode ? handleResetPassword : handleAdminLogin}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>

          {!isResetMode && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full"
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
          >
            {isResetMode ? 'Send Reset Email' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsResetMode(!isResetMode)}
            className="text-sm text-indigo-600 hover:underline"
          >
            {isResetMode ? 'Back to Login' : 'Forgot Password?'}
          </button>
        </div>

        {!isResetMode && (
          <div className="flex justify-between space-x-4 mt-4">
            <button
              onClick={() => navigate('/signup')}
              className="btn btn-outline w-1/2"
            >
              Signup
            </button>
            <button
              onClick={() => navigate('/login/user')}
              className="btn btn-outline w-1/2"
            >
              User Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;

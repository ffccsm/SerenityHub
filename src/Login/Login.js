import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setMessage('You are already logged in.');
      } else {
        setIsLoggedIn(false);
        setMessage('');
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/appointment/appointment'); // Redirect after successful login
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false); // Reset login state
      setMessage('You have successfully logged out.');
    } catch (error) {
      setError('Failed to log out. Please try again.');
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email to reset the password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link has been sent to your email.');
      setError(''); // Clear previous errors
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('No user found with this email address.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {isLoggedIn ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">Already Logged In</h1>
            <p className="text-green-500 mb-4 text-center">{message}</p>
            <button
              className="btn btn-primary w-full mb-4"
              onClick={() => navigate('/appointment/appointment')}
            >
              Go to Appointments
            </button>
            <button
              className="btn btn-secondary w-full"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </>
        ) : !forgotPassword ? (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </form>
            <p className="mt-4 text-gray-600 text-center">
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="text-blue-500 hover:underline"
              >
                Forgot password?
              </button>
            </p>
            <p className="mt-4 text-gray-600 text-center">
              Please contact your Administrator for credentials.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-primary w-full">
                Send Reset Link
              </button>
            </form>
            <p className="mt-4 text-gray-600 text-center">
              <button
                type="button"
                onClick={() => setForgotPassword(false)}
                className="text-blue-500 hover:underline"
              >
                Back to Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

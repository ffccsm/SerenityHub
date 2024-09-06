import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully');
      navigate('/user/dashboard');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      toast.error('Login failed. Try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-600">User Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleUserLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between space-x-4 mt-4">
          <button 
            onClick={() => navigate('/signup')} 
            className="btn btn-outline w-1/2"
          >
            Signup
          </button>
          <button 
            onClick={() => navigate('/login/admin')} 
            className="btn btn-outline w-1/2"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

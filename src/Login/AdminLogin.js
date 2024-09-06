import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'admin') {
          toast.success('Admin logged in successfully');
          navigate('/admin/dashboard');
        } else {
          setError('Unauthorized access');
          toast.error('You do not have admin access.');
        }
      } else {
        setError('User document not found');
        toast.error('User not found.');
      }
    } catch (error) {
      setError(`Login failed: ${error.message}`);
      toast.error(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-600">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleAdminLogin} className="space-y-4">
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

        {/* Add Signup and User Login options */}
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
      </div>
    </div>
  );
};

export default AdminLogin;
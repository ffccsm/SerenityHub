import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase'; // Ensure db is imported correctly
import { useAuthState } from 'react-firebase-hooks/auth'; // Firebase hooks for easy user state management
import { toast } from 'react-hot-toast';

const Appointment = () => {
  const [user, loading] = useAuthState(auth); // Fetch authenticated user data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointmentDate: '',
    service: '',
    additionalRequirement: '',
  });

  useEffect(() => {
    if (user) {
      // Auto-fill user data when user is logged in
      setFormData((prevData) => ({
        ...prevData,
        name: user.displayName || '', // Ensure displayName is set in user profile
        email: user.email || '',
        phone: '', // Ensure phone number is stored in user profile or add manual entry
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        userId: user.uid,
        status: 'pending', // Default status as pending
      });
      toast.success('Appointment successfully submitted!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        appointmentDate: '',
        service: '',
        additionalRequirement: '',
      });
    } catch (error) {
      toast.error('Failed to submit appointment.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Book Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Appointment Date</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]} // Min date today
              max={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]} // Max date 30 days from today
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select Service</option>
              <option value="AddictionTreatment">Addiction Treatment</option>
              <option value="DrugRehab">Drug Rehab</option>
              <option value="Programmes">Programmes</option>
              <option value="Detoxification">Detoxification</option>
              <option value="Therapies">Therapies</option>
              <option value="Aftercare">Aftercare</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="additionalRequirement" className="block text-sm font-medium text-gray-700">Additional Requirements</label>
            <textarea
              id="additionalRequirement"
              name="additionalRequirement"
              value={formData.additionalRequirement}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;

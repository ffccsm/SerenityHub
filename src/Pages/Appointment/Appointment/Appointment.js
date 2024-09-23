import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase'; 
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'daisyui';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Appointment = () => {
  const [user, loading] = useAuthState(auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointmentDate: new Date(),
    service: '',
    additionalRequirement: '',
  });

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      setShowPopup(true);
    } else if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.displayName || '',
        email: user.email || '',
        phone: user.phone || '', 
      }));
    }
  }, [user, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      appointmentDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        appointmentDate: formData.appointmentDate.toISOString(),
        userId: user ? user.uid : null,
        status: 'pending',
      });
      toast.success('Appointment successfully submitted!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        appointmentDate: new Date(),
        service: '',
        additionalRequirement: '',
      });
    } catch (error) {
      toast.error('Failed to submit appointment.');
      console.error(error);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/home');
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handlePopupClose}
            >
              &#x2715;
            </button>
            <h3 className="text-lg font-semibold mb-4">Login Required</h3>
            <p className="mb-4">You need to log in to book an appointment.</p>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => navigate('/login/user')}
              >
                Login
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={() => navigate('/signup')}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Book Your Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly={!!user}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly={!!user}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <PhoneInput
                country={'bd'} // Default to Bangladesh
                value={formData.phone}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: 'calc(100% - 60px)',
                  padding: '12px',
                  paddingLeft: '55px',
                  borderRadius: '6px',
                  border: '1px solid #D1D5DB', 
                }}
                buttonStyle={{
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px 0 0 6px',
                  marginRight: '10px',
                }}
                enableSearch={true}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Appointment Date</label>
              <DatePicker
                selected={formData.appointmentDate}
                onChange={handleDateChange}
                minDate={new Date()}
                maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="yyyy/MM/dd"
                placeholderText="Select a date"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Any additional requests or information..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Appointment;

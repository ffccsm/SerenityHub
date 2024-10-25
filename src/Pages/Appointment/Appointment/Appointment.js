import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Appointment = () => {
  const [user, loading] = useAuthState(auth);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [services] = useState([
    { name: 'Addiction Treatment', price: 8999 },
    { name: 'Drug Rehab', price: 8999 },
    { name: 'Programmes', price: 8999 },
    { name: 'Detoxification', price: 8999 },
    { name: 'Therapies', price: 8999 },
    { name: 'Aftercare', price: 8999 },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || '',
        email: user.email || '',
        phone: '',
      });
    }
  }, [user, loading]);

  const handleBookAppointment = (service) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    setSelectedService(service);
    setShowPopup(true);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?[0-9]{10,14}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError('Please enter a valid phone number.');
      return;
    }
    setPhoneError('');
    try {
      await addDoc(collection(db, 'appointments'), {
        userId: user ? user.uid : null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        appointmentDate: selectedDate.toISOString(),
        service: selectedService.name,
        status: 'pending',
      });
      toast.success('Appointment successfully submitted!');
      setShowPopup(false);
    } catch (error) {
      toast.error('Failed to submit appointment.');
      console.error(error);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleLoginRedirect = () => {
    navigate('/login/user');
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  const getDayClass = ({ date }) => {
    const day = date.getDay();
    return day === 6 || day === 0 ? 'bg-red-200 text-red-700' : 'text-gray-700';
  };

  const handleDateClick = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      toast.error('You cannot book an appointment for a past date.');
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <div className="max-w-7xl w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12">
        <div className="flex flex-col items-center w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6 border border-gray-300">
          <h2 className="text-3xl font-semibold mb-6 text-blue-600">
            Select Date
          </h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            onClickDay={handleDateClick}
            tileClassName={({ date }) =>
              date.toDateString() === new Date().toDateString()
                ? 'bg-blue-100'
                : getDayClass({ date })
            }
            className="rounded-lg border border-gray-300 shadow-md p-4 bg-gray-50"
          />
          <div className="mt-4 text-lg text-gray-700">
            Selected Date: <span className="font-bold text-blue-500">{selectedDate.toDateString()}</span>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h3 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Available Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                <h4 className="text-xl font-semibold text-gray-800">{service.name}</h4>
                <p className="text-gray-600 mt-2">Spaces Available: 15</p>
                <p className="text-lg text-blue-700 font-medium mt-2">Price: {service.price} BDT</p>
                <button
                  className="mt-4 bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => handleBookAppointment(service)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPopup && selectedService && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50 animate-fadeInUp">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10 p-2 rounded-full"
              onClick={handlePopupClose}
            >
              ✕
            </button>
            <h3 className="text-center text-2xl font-bold mb-6">{selectedService.name}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
                <input
                  type="text"
                  value={selectedDate.toDateString()}
                  readOnly
                  className="w-full p-3 rounded-lg bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  readOnly
                  className="w-full p-3 rounded-lg bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  readOnly
                  className="w-full p-3 rounded-lg bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className={`w-full p-3 rounded-lg ${phoneError ? 'border-red-500' : ''}`}
                  required
                />
                {phoneError && (
                  <p className="text-red-500 text-sm mt-2">{phoneError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50 animate-fadeInUp">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10 p-2 rounded-full"
              onClick={() => setShowLoginPrompt(false)}
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center">Please Log In</h3>
            <p className="text-gray-600 text-center mb-6">
              You need to log in to book an appointment.
            </p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleLoginRedirect}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                Login
              </button>
              <button
                onClick={handleSignUpRedirect}
                className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;

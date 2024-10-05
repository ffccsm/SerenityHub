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
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || '',
        email: user.email || '',
        phone: '',
      });
    } else if (!loading) {
      setShowPopup(true);
    }
  }, [user, loading]);

  const handleBookAppointment = (service) => {
    if (!user) {
      setShowPopup(true);
      return;
    }
    setSelectedService(service);
    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    if (!user) {
      navigate('/home');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login/user');
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  const getDayClass = ({ date }) => {
    const day = date.getDay();
    return day === 6 || day === 0 ? 'weekend-day' : null;
  };

  if (!user) {
    return (
      <>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handlePopupClose}
              >
                &#x2715;
              </button>
              <h3 className="text-2xl font-bold text-center mb-4">
                Please Login for Appointment
              </h3>
              <div className="flex justify-between">
                <button
                  className="btn btn-primary w-5/12"
                  onClick={handleLoginRedirect}
                >
                  Login
                </button>
                <button
                  className="btn btn-secondary w-5/12"
                  onClick={handleSignUpRedirect}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="shadow-2xl rounded-xl p-8 w-full max-w-7xl mx-auto bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
          Book Your Appointment
        </h2>

        <div className="mb-10">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="custom-calendar rounded-xl shadow-lg border mx-auto"
            tileClassName={getDayClass}
          />
        </div>

        <div className="mb-10">
          <h3 className="text-3xl font-semibold mb-6 text-center text-blue-600">
            Available Services on {selectedDate.toDateString()}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.name}
                className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <h4 className="font-bold text-xl text-center text-gray-700">
                  {service.name}
                </h4>
                <p className="text-gray-600 text-center mt-2">Spaces Available: 15</p>
                <p className="text-gray-900 font-semibold text-center mt-2">
                  Price: {service.price} BDT
                </p>
                <div className="mt-6 text-center">
                  <button
                    className="bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 hover:bg-blue-800 shadow-lg"
                    onClick={() => handleBookAppointment(service)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showPopup && user && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handlePopupClose}
              >
                &#x2715;
              </button>

              <h3 className="text-center text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
                {selectedService?.name}
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Appointment Date
                  </label>
                  <input
                    type="text"
                    value={selectedDate.toDateString()}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 text-gray-600"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 text-gray-600"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 text-gray-600"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    pattern="\d*"
                    maxLength="14"
                    placeholder="Enter your phone number"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full shadow-md hover:bg-blue-800 transition-all duration-300"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;

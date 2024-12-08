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
    { name: 'Drug Rehab', price: 7999 },
    { name: 'Programmes', price: 6999 },
    { name: 'Detoxification', price: 5999 },
    { name: 'Therapies', price: 4999 },
    { name: 'Aftercare', price: 3999 },
  ]);

  const [doctors] = useState([
    {
      name: 'Dr. Farhana Ahmed',
      title: 'Addiction Professional (International Certified)',
      bio: 'Specialized in addiction treatment and recovery programs.',
      profileImage: 'https://i.postimg.cc/vTyJMs7m/15.jpg',
    },
    {
      name: 'Dr. Rezaul Karim',
      title: 'Psychiatrist (Asst. Professor)',
      bio: 'Expert in psychiatry and mental health care.',
      profileImage: 'https://i.postimg.cc/ZnjMSyKf/1.jpg',
    },
    {
      name: 'Dr. Nusrat Jahan',
      title: 'Addiction Professional (International Certified)',
      bio: 'Experienced in therapy and rehabilitation for addiction.',
      profileImage: 'https://i.postimg.cc/G2GWZ2yN/14.jpg',
    },
    {
      name: 'Dr. Arif Chowdhury',
      title: 'Psychiatrist (Asst. Professor)',
      bio: 'Specialized in psychiatry, mental health treatment, and care.',
      profileImage: 'https://i.postimg.cc/T3BHfxfX/10.jpg',
    },
    {
      name: 'Dr. Selina Begum',
      title: 'Addiction Professional (International Certified)',
      bio: 'Specialized in addiction treatment and recovery programs.',
      profileImage: 'https://i.postimg.cc/L4BdDJRg/17.jpg',
    },
    {
      name: 'Dr. Imran Hossain',
      title: 'Psychiatrist (Asst. Professor)',
      bio: 'Expert in psychiatric evaluation, diagnosis, and treatment.',
      profileImage: 'https://i.postimg.cc/hjWwbB50/3.jpg',
    },
    {
      name: 'Dr. Khadija Sultana',
      title: 'Addiction Professional (International Certified)',
      bio: 'Focused on addiction recovery and rehabilitation programs.',
      profileImage: 'https://i.postimg.cc/GmtZbzDv/20.jpg',
    },
    {
      name: 'Dr. Shahidul Alam',
      title: 'Psychiatrist (Asst. Professor)',
      bio: 'Expert in clinical psychiatry, treatment, and mental health.',
      profileImage: 'https://i.postimg.cc/65jmbRPq/8.jpg',
    },
    {
      name: 'Dr. Sultana Akhter',
      title: 'Addiction Professional (International Certified)',
      bio: 'Specialized in treating addiction with an international certification.',
      profileImage: 'https://i.postimg.cc/13dbX602/21.jpg',
    }
  ]);


  const [showPopup, setShowPopup] = useState(false);
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
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
      toast.error('Please log in to book an appointment.');
      navigate('/login/user');
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
    if (!selectedDoctor) {
      toast.error('Please select a doctor.');
      return;
    }
    setPhoneError('');
    try {
      await addDoc(collection(db, 'appointments'), {
        userId: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        appointmentDate: selectedDate.toISOString(),
        service: selectedService.name,
        doctor: selectedDoctor,
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

  const handleDoctorProfileClose = () => {
    setShowDoctorProfile(false);
  };

  const handleDoctorProfileOpen = (doctor) => {
    setSelectedDoctor(doctor.name);
    setShowDoctorProfile(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <div className="max-w-7xl w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12">
        <div className="flex flex-col items-center w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6 border border-gray-300">
          <h2 className="text-3xl font-semibold mb-6 text-blue-600">Select Date</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="rounded-lg border border-gray-300 shadow-md p-4 bg-gray-50"
          />
          <div className="mt-4 text-lg text-gray-700">
            Selected Date: <span className="font-bold text-blue-500">{selectedDate.toDateString()}</span>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h3 className="text-3xl font-semibold mb-6 text-center text-gray-800">Available Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg"
              >
                <h4 className="text-xl font-semibold text-gray-800">{service.name}</h4>
                <p className="text-gray-600 mt-2">Spaces Available: 15</p>
                <p className="text-lg text-blue-700 font-medium mt-2">Price: {service.price} BDT</p>
                <button
                  className="mt-4 bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700"
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
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
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

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
                <select
                  className="w-full p-3 rounded-lg bg-gray-100"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.name} value={doctor.name}>
                      {doctor.name} ({doctor.title})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between items-center mb-6">
                <button
                  type="submit"
                  className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-green-700"> Submit Appointment </button> <button type="button" className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700"
                    onClick={() => handleDoctorProfileOpen(doctors.find((doctor) => doctor.name === selectedDoctor))} > View Doctor Profile </button> </div> </form> </div> </div>)}

      {showDoctorProfile && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={handleDoctorProfileClose}
            >
              ✕
            </button>
            {doctors
              .filter((doctor) => doctor.name === selectedDoctor)
              .map((doctor) => (
                <div key={doctor.name} className="text-center">
                  <img
                    src={doctor.profileImage}
                    alt={`${doctor.name}'s profile`}
                    className="w-32 h-32 rounded-full mx-auto mb-4 border border-gray-300"
                  />
                  <h3 className="text-2xl font-bold mb-4">{doctor.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{doctor.title}</p>
                  <p className="text-gray-700">{doctor.bio}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
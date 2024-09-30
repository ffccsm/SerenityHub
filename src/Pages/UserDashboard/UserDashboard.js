import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const warmMessages = [
  "Your journey to recovery is important to us. We're here to support you every step of the way!",
  "Remember, healing takes time. Celebrate every small victory along your path.",
  "You are not alone in this journey. Our community is here to uplift and empower you.",
  "Every day is a new opportunity for growth and healing. Keep pushing forward!",
  "Your courage to seek help is the first step towards a brighter future. We're proud of you!"
];

const UserDashboard = () => {
  const [user] = useAuthState(auth);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'appointments'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedAppointments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
      
        fetchedAppointments.sort((a, b) => {
          if (a.status === 'pending' && b.status !== 'pending') return -1;
          if (b.status === 'pending' && a.status !== 'pending') return 1;
          return 0; 
        });
  
        setAppointments(fetchedAppointments);
      } catch (err) {
        setError('Failed to fetch appointments.');
        console.error(err);
        toast.error('Failed to fetch appointments.');
      } finally {
        setLoading(false);
      }
    };
  
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success('Signed out successfully!');
      navigate('/login/user');
    } catch (error) {
      toast.error('Failed to sign out.');
    }
  };

  const randomMessage = warmMessages[Math.floor(Math.random() * warmMessages.length)];

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-300 text-green-800';
      case 'declined':
        return 'bg-red-300 text-red-800';
      case 'pending':
        return 'bg-yellow-300 text-yellow-800';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-800 text-white flex flex-col">
        <div className="flex items-center justify-center h-16 text-2xl font-bold">
          Dashboard
        </div>
        <nav className="flex-1">
          <ul>
            <li className="py-4 px-6 bg-gray-700 md:block hidden">
              <span>Your Appointments</span>
            </li>
            <li className="py-4 px-6 hover:bg-gray-700 md:block hidden">
              <button className="w-full text-left" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>

            
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
          <header className="mb-4 text-center">
            <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user.displayName || 'User'}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 italic mt-2">{randomMessage}</p>
          </header>

          <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Your Appointments</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading ? (
              <p className="text-gray-500">Loading appointments...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white rounded-lg shadow-md p-4">
                      <h3 className="text-lg md:text-xl font-semibold">{appointment.service}</h3>
                      <p className="text-gray-700"><strong>Date:</strong> {formatDate(appointment.appointmentDate)}</p>
                      <p className={`mt-2 px-2 py-1 rounded-full ${getStatusClass(appointment.status)}`}>
                        {appointment.status}
                      </p>
                      <button
                        className="mt-4 text-blue-600 hover:underline"
                        onClick={() => openModal(appointment)}
                      >
                        View Details
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">You have no appointments.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {selectedAppointment && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    onClick={closeModal} 
  >
    <div
      className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-8"
      onClick={(e) => e.stopPropagation()} 
    >
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-700">
        Appointment Overview
      </h2>

      {/* Minimalist Card-Based Layout */}
      <div className="space-y-4">
        {/* Service Card */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-600 mb-1">Service</h3>
          <p className="text-gray-900">{selectedAppointment.service}</p>
        </div>

        {/* Date and Status in One Card */}
        <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-gray-600 mb-1">Date</h3>
            <p className="text-gray-900">{formatDate(selectedAppointment.appointmentDate)}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-gray-600 mb-1">Status</h3>
            <p className={`font-semibold ${getStatusClass(selectedAppointment.status)}`}>
              {selectedAppointment.status}
            </p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-600 mb-1">User Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-gray-600">Name</span>
              <span className="text-gray-900">{selectedAppointment.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Email</span>
              <span className="text-gray-900">{selectedAppointment.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Phone</span>
              <span className="text-gray-900">{selectedAppointment.phone}</span>
            </div>
          </div>
        </div>

        {/* Decline Reason Card */}
        {selectedAppointment.declineReason && (
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-red-600 mb-1">Decline Reason</h3>
            <p className="text-red-900">{selectedAppointment.declineReason}</p>
          </div>
        )}
      </div>

      {/* Footer with Close Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="btn btn-primary"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



      </div>
    </div>
  );
};

export default UserDashboard;

import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';

const UserDashboard = () => {
  const [user] = useAuthState(auth);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // For modal data
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'appointments'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedAppointments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

  // Function to open modal with selected appointment details
  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-green-400 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">User Dashboard</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading ? (
          <p className="text-center text-gray-500">Loading appointments...</p>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Information</h2>
              <div className="flex flex-col space-y-2">
                <p className="text-lg"><span className="font-semibold">Name:</span> {user.displayName || 'N/A'}</p>
                <p className="text-lg"><span className="font-semibold">Email:</span> {user.email || 'N/A'}</p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
              {appointments.length > 0 ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Service</th>
                      <th className="border px-4 py-2">Appointment Date</th>
                      <th className="border px-4 py-2">Status</th>
                      <th className="border px-4 py-2">Decline Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="border px-4 py-2">
                          <button
                            className="text-blue-500 underline"
                            onClick={() => openModal(appointment)} // Open modal on click
                          >
                            {appointment.service}
                          </button>
                        </td>
                        <td className="border px-4 py-2">{formatDate(appointment.appointmentDate)}</td>
                        <td className="border px-4 py-2">
                          <span className={`px-2 py-1 rounded-full ${appointment.status === 'pending' ? 'bg-yellow-300 text-yellow-800' : 'bg-green-300 text-green-800'}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="border px-4 py-2">
                          {appointment.declineReason ? (
                            <p>{appointment.declineReason}</p>
                          ) : (
                            <p>N/A</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500">You have no appointments.</p>
              )}
            </div>
          </div>
        )}

        {/* Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              {/* Cross (X) to close modal */}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closeModal}
              >
                ✖️
              </button>
              <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
              <p><strong>Service:</strong> {selectedAppointment.service}</p>
              <p><strong>Appointment Date:</strong> {formatDate(selectedAppointment.appointmentDate)}</p>
              <p><strong>Name:</strong> {selectedAppointment.name}</p>
              <p><strong>Email:</strong> {selectedAppointment.email}</p>
              <p><strong>Phone:</strong> {selectedAppointment.phone}</p>
              <p><strong>Additional Requirement:</strong> {selectedAppointment.additionalRequirement}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

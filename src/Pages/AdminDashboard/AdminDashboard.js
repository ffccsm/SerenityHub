import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('allAppointments');
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [confirmations, setConfirmations] = useState([]);
  const [declineReason, setDeclineReason] = useState('');
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsSnapshot = await getDocs(collection(db, 'appointments'));
        const usersSnapshot = await getDocs(collection(db, 'users'));

        const allAppointments = appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const pendingAppointments = allAppointments.filter(app => app.status === 'pending');
        const confirmations = allAppointments.filter(app => app.status === 'approved');

        setAppointments(allAppointments);
        setPendingAppointments(pendingAppointments);
        setConfirmations(confirmations);
        setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleApproveAppointment = async (id) => {
    try {
      const appointmentRef = doc(db, 'appointments', id);
      await updateDoc(appointmentRef, { status: 'approved' });
      setAppointments(appointments.map(app => (app.id === id ? { ...app, status: 'approved' } : app)));
      setConfirmations(confirmations.concat(appointments.find(app => app.id === id)));
      setShowApproveModal(false);
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  const handleDeclineAppointment = async (id) => {
    if (!declineReason.trim()) {
      alert('Please provide a reason for declining.');
      return;
    }

    try {
      const appointmentRef = doc(db, 'appointments', id);
      await updateDoc(appointmentRef, { status: 'declined', declineReason });
      setAppointments(appointments.map(app => (app.id === id ? { ...app, status: 'declined', declineReason } : app)));
      setShowDeclineModal(false);
    } catch (error) {
      console.error('Error declining appointment:', error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteDoc(doc(db, 'appointments', id));
      setAppointments(appointments.filter(app => app.id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleMakeAdmin = async (id) => {
    try {
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, { role: 'admin' });
      setUsers(users.map(user => (user.id === id ? { ...user, role: 'admin' } : user)));
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const paginatedAppointments = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderAppointments = () => {
    return paginatedAppointments.map(app => (
      <tr key={app.id} className={`hover:bg-gray-100 ${app.status === 'pending' ? 'bg-yellow-50' : 'bg-green-50'}`}>
        <td className="px-4 py-2">{app.name}</td>
        <td className="px-4 py-2">{app.email}</td>
        <td className="px-4 py-2">{app.service}</td>
        <td className="px-4 py-2">{formatDate(app.appointmentDate)}</td>
        <td className="px-4 py-2">
          <span className={`px-2 py-1 rounded-full ${app.status === 'pending' ? 'bg-yellow-300 text-yellow-800' : 'bg-green-300 text-green-800'}`}>
            {app.status}
          </span>
        </td>
        <td className="px-4 py-2 flex space-x-2">
          <button onClick={() => setSelectedAppointment(app)} className="btn btn-info">View</button>
          {app.status === 'pending' && (
            <>
              <button onClick={() => setShowApproveModal(app)} className="btn btn-primary">Approve</button>
              <button onClick={() => setShowDeclineModal(app)} className="btn btn-warning">Decline</button>
            </>
          )}
          <button onClick={() => setShowDeleteModal(app)} className="btn btn-error">Delete</button>
        </td>
      </tr>
    ));
  };

  const renderPendingAppointments = () => {
    return pendingAppointments.map(app => (
      <tr key={app.id}>
        <td className="px-4 py-2">{app.name}</td>
        <td className="px-4 py-2">{app.email}</td>
        <td className="px-4 py-2">{app.service}</td>
        <td className="px-4 py-2">{formatDate(app.appointmentDate)}</td>
        <td className="px-4 py-2">
          <button onClick={() => setShowApproveModal(app)} className="btn btn-primary mr-2">Approve</button>
          <button onClick={() => setShowDeclineModal(app)} className="btn btn-warning">Decline</button>
        </td>
      </tr>
    ));
  };

  const renderConfirmations = () => {
    return confirmations.map(confirm => (
      <tr key={confirm.id}>
        <td className="px-4 py-2">{confirm.name}</td>
        <td className="px-4 py-2">{confirm.email}</td>
        <td className="px-4 py-2">{confirm.service}</td>
        <td className="px-4 py-2">{formatDate(confirm.appointmentDate)}</td>
        <td className="px-4 py-2">{confirm.status}</td>
      </tr>
    ));
  };

  const renderAllUsers = () => {
    return users.map(user => (
      <tr key={user.id} className="hover:bg-gray-100">
        <td className="px-4 py-2">{user.name}</td>
        <td className="px-4 py-2">{user.email}</td>
        <td className="px-4 py-2">{user.role}</td>
        <td className="px-4 py-2 flex space-x-2">
          {user.role !== 'admin' && (
            <button onClick={() => handleMakeAdmin(user.id)} className="btn btn-info">Make Admin</button>
          )}
          <button onClick={() => handleDeleteUser(user.id)} className="btn btn-error">Delete</button>
        </td>
      </tr>
    ));
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded-lg ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400`}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="mt-4 flex justify-center">
        {pages}
      </div>
    );
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <button
          onClick={() => setSelectedSection('allAppointments')}
          className={`block w-full text-left px-4 py-2 rounded ${selectedSection === 'allAppointments' ? 'bg-blue-500 text-white' : ''}`}
        >
          All Appointments
        </button>
        <button
          onClick={() => setSelectedSection('pendingAppointments')}
          className={`block w-full text-left px-4 py-2 rounded ${selectedSection === 'pendingAppointments' ? 'bg-blue-500 text-white' : ''}`}
        >
          Pending Appointments
        </button>
        <button
          onClick={() => setSelectedSection('confirmations')}
          className={`block w-full text-left px-4 py-2 rounded ${selectedSection === 'confirmations' ? 'bg-blue-500 text-white' : ''}`}
        >
          Confirmations
        </button>
        <button
          onClick={() => setSelectedSection('allUsers')}
          className={`block w-full text-left px-4 py-2 rounded ${selectedSection === 'allUsers' ? 'bg-blue-500 text-white' : ''}`}
        >
          All Users
        </button>
      </div>

      {/* Main content */}
      <div className="w-3/4 p-4">
        {selectedSection === 'allAppointments' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Service</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>{renderAppointments()}</tbody>
            </table>
            {renderPagination()}
          </div>
        )}
        {selectedSection === 'pendingAppointments' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Pending Appointments</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Service</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>{renderPendingAppointments()}</tbody>
            </table>
          </div>
        )}
        {selectedSection === 'confirmations' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Confirmations</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Service</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>{renderConfirmations()}</tbody>
            </table>
          </div>
        )}
        {selectedSection === 'allUsers' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>{renderAllUsers()}</tbody>
            </table>
          </div>
        )}

        {/* Approve Modal */}
        {showApproveModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
              <h3 className="text-xl font-semibold mb-4">Approve Appointment</h3>
              <p>Are you sure you want to approve this appointment?</p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => handleApproveAppointment(showApproveModal.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Yes
                </button>
                <button onClick={() => setShowApproveModal(false)} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Decline Modal */}
        {showDeclineModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
              <h3 className="text-xl font-semibold mb-4">Decline Appointment</h3>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Reason for declining"
              />
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => handleDeclineAppointment(showDeclineModal.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Decline
                </button>
                <button onClick={() => setShowDeclineModal(false)} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
              <h3 className="text-xl font-semibold mb-4">Delete Appointment</h3>
              <p>Are you sure you want to delete this appointment?</p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => handleDeleteAppointment(showDeleteModal.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Yes
                </button>
                <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Appointment Details Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
              <h3 className="text-xl font-semibold mb-4">Appointment Details</h3>
              <p><strong>Name:</strong> {selectedAppointment.name}</p>
              <p><strong>Email:</strong> {selectedAppointment.email}</p>
              <p><strong>Service:</strong> {selectedAppointment.service}</p>
              <p><strong>Date:</strong> {formatDate(selectedAppointment.appointmentDate)}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
              {selectedAppointment.declineReason && (
                <p><strong>Decline Reason:</strong> {selectedAppointment.declineReason}</p>
              )}
              <div className="mt-4 flex justify-end space-x-4">
                <button onClick={() => setSelectedAppointment(null)} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
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

export default AdminDashboard;
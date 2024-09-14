import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('allAppointments');
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [confirmations, setConfirmations] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [declineReason, setDeclineReason] = useState('');
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

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
      <tr key={app.id}>
        <td>{app.name}</td>
        <td>{app.email}</td>
        <td>{app.service}</td>
        <td>{formatDate(app.appointmentDate)}</td>
        <td>
          <span className={`px-2 py-1 rounded-full ${app.status === 'pending' ? 'bg-yellow-300 text-yellow-800' : 'bg-green-300 text-green-800'}`}>
            {app.status}
          </span>
        </td>
        <td>
          {app.status === 'pending' && (
            <>
              <button onClick={() => setShowApproveModal(app)} className="btn btn-primary mr-2">Approve</button>
              <button onClick={() => setShowDeclineModal(app)} className="btn btn-warning mr-2">Decline</button>
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
        <td>{app.name}</td>
        <td>{app.email}</td>
        <td>{app.service}</td>
        <td>{formatDate(app.appointmentDate)}</td>
        <td>
          <button onClick={() => setShowApproveModal(app)} className="btn btn-primary mr-2">Approve</button>
          <button onClick={() => setShowDeclineModal(app)} className="btn btn-warning">Decline</button>
        </td>
      </tr>
    ));
  };

  const renderConfirmations = () => {
    return confirmations.map(confirm => (
      <tr key={confirm.id}>
        <td>{confirm.name}</td>
        <td>{confirm.email}</td>
        <td>{confirm.service}</td>
        <td>{formatDate(confirm.appointmentDate)}</td>
        <td>{confirm.status}</td>
      </tr>
    ));
  };

  const renderAllUsers = () => {
    return users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          {user.role !== 'admin' && (
            <button onClick={() => handleMakeAdmin(user.id)} className="btn btn-info mr-2">Make Admin</button>
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
          className={`btn ${currentPage === i ? 'btn-primary' : 'btn-secondary'} mr-2`}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="mt-4">
        {pages}
      </div>
    );
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 p-4">
        <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
        <ul className="space-y-2">
          <li>
            <button onClick={() => setSelectedSection('allAppointments')} className={`w-full py-2 px-4 text-left ${selectedSection === 'allAppointments' ? 'bg-blue-500 text-white' : 'bg-white'}`}>All Appointments</button>
          </li>
          <li>
            <button onClick={() => setSelectedSection('pendingAppointments')} className={`w-full py-2 px-4 text-left ${selectedSection === 'pendingAppointments' ? 'bg-blue-500 text-white' : 'bg-white'}`}>Pending Appointments</button>
          </li>
          <li>
            <button onClick={() => setSelectedSection('confirmations')} className={`w-full py-2 px-4 text-left ${selectedSection === 'confirmations' ? 'bg-blue-500 text-white' : 'bg-white'}`}>Confirmations</button>
          </li>
          <li>
            <button onClick={() => setSelectedSection('allUsers')} className={`w-full py-2 px-4 text-left ${selectedSection === 'allUsers' ? 'bg-blue-500 text-white' : 'bg-white'}`}>All Users</button>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-4">
        {selectedSection === 'allAppointments' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
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
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderPendingAppointments()}</tbody>
            </table>
          </div>
        )}
        {selectedSection === 'confirmations' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Confirmations</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{renderConfirmations()}</tbody>
            </table>
          </div>
        )}
        {selectedSection === 'allUsers' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderAllUsers()}</tbody>
            </table>
          </div>
        )}

        {/* Approve Modal */}
        {showApproveModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Approve Appointment</h3>
              <p>Are you sure you want to approve this appointment?</p>
              <div className="mt-4">
                <button
                  onClick={() => handleApproveAppointment(showApproveModal.id)}
                  className="btn btn-primary mr-2"
                >
                  Yes
                </button>
                <button onClick={() => setShowApproveModal(false)} className="btn">
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Decline Modal */}
        {showDeclineModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Decline Appointment</h3>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Reason for declining"
              />
              <div className="mt-4">
                <button
                  onClick={() => handleDeclineAppointment(showDeclineModal.id)}
                  className="btn btn-warning mr-2"
                >
                  Decline
                </button>
                <button onClick={() => setShowDeclineModal(false)} className="btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Delete Appointment</h3>
              <p>Are you sure you want to delete this appointment?</p>
              <div className="mt-4">
                <button
                  onClick={() => handleDeleteAppointment(showDeleteModal.id)}
                  className="btn btn-error mr-2"
                >
                  Yes
                </button>
                <button onClick={() => setShowDeleteModal(false)} className="btn">
                  No
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

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch appointments from the backend
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5005/api/appointments');
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
          setLoading(false);
        } else {
          toast.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('An error occurred while fetching appointments');
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <div style={{ marginTop: '2rem', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '600', color: '#00b894', marginBottom: '2rem' }}>Appointments List</h1>

      {appointments.length === 0 ? (
        <div>No appointments found</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '2rem 0' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Appointment Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Service</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Additional Requirement</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.phone}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.service}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.additionalRequirement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentsList;

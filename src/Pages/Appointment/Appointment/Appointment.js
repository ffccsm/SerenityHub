import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaTelegramPlane } from 'react-icons/fa';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // 

const Appointment = () => {
  const form = useRef();
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [defaultDate, setDefaultDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

    // Format dates as YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split('T')[0];

    setMinDate(formatDate(today));
    setMaxDate(formatDate(nextMonth));
    setDefaultDate(formatDate(today)); // Set default date to today
  }, []);

  const handleSendAppointment = async (event) => {
    event.preventDefault();

    const formData = {
      name: event.target.name.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      appointmentDate: event.target.appointmentDate.value,
      service: event.target.service.value,
      additionalRequirement: event.target.additionalRequirement.value,
    };

    try {
      await addDoc(collection(db, 'appointments'), formData);
      toast.success('Appointment successfully booked!');
      form.current.reset();
    } catch (error) {
      console.error('Error adding appointment: ', error);
      toast.error('Failed to book appointment. Try again.');
    }
  };

  return (
    <div style={{ marginTop: '2.5rem', padding: '0 1rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '600', color: '#00b894', marginBottom: '2rem' }}>Book an Appointment</h1>

      <div style={{ padding: '2rem 0' }}>
        <div
          id='appointment'
          style={{ 
            background: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://i.ibb.co/PjXkTxJ/contact.jpg')",
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            padding: '2rem',
            borderRadius: '1rem',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '1rem', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
            width: '90%',
            maxWidth: '600px'
          }}>
            <h1 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '600', color: '#00b894', marginBottom: '1.5rem' }}>Please fill in your details</h1>

            <form ref={form} onSubmit={handleSendAppointment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Form Fields: Name, Phone, Email, etc */}
              <div style={{ position: 'relative' }}>
                <input
                  id="name"
                  name='name'
                  type="text"
                  placeholder=" "
                  style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                  required
                />
                <label htmlFor="name" style={labelStyle}>Name</label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="phone"
                  name='phone'
                  type="tel"
                  placeholder=" "
                  style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                  required
                />
                <label htmlFor="phone" style={labelStyle}>Phone</label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="email"
                  name='email'
                  type="email"
                  placeholder=" "
                  style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                  required
                />
                <label htmlFor="email" style={labelStyle}>Email</label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="appointmentDate"
                  name='appointmentDate'
                  type="date"
                  min={minDate}
                  max={maxDate}
                  defaultValue={defaultDate}
                  style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                  required
                />
                <label htmlFor="appointmentDate" style={labelStyle}>Appointment Date</label>
              </div>
              <select
                name='service'
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                required
              >
                <option value="" disabled>Select Service</option>
                <option value="Physical Therapy">Physical Therapy</option>
                <option value="Occupational Therapy">Individual Counseling</option>
                <option value="Speech Therapy">Group Therapy</option>
                <option value="Cardiac Rehabilitation">Medication Management </option>
                <option value="Neurological Rehabilitation">Biofeedback Therapy</option>
                <option value="Pediatric Rehabilitation">Aftercare Services</option>
              </select>
              <textarea
                name='additionalRequirement'
                placeholder="Additional Requirement"
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                required
              ></textarea>
              <button type='submit' style={buttonStyle}>
                <FaTelegramPlane style={{ marginRight: '0.5rem', fontSize: '1.25rem' }} />
                <span style={{ textAlign: 'center' }}>Book Appointment</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Label and button styles
const labelStyle = {
  position: 'absolute',
  top: '0.75rem',
  left: '0.75rem',
  fontSize: '1rem',
  color: '#aaa',
  pointerEvents: 'none',
  transition: '0.3s ease',
  transform: 'translateY(-1.25rem)',
  backgroundColor: 'white',
  padding: '0 0.25rem',
  transformOrigin: 'top left'
};

const buttonStyle = {
  backgroundColor: '#00b894',
  color: 'white',
  border: 'none',
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default Appointment;

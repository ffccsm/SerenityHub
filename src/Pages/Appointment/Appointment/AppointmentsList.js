import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import * as XLSX from 'xlsx';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'appointments'));
        const appointmentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const filterAppointments = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let filteredData = [];

    if (filter === 'Today') {
      filteredData = appointments.filter(
        appointment =>
          new Date(appointment.appointmentDate).toDateString() ===
          today.toDateString()
      );
    } else {
      filteredData = appointments;
    }

    setFilteredAppointments(filteredData);
  }, [appointments, filter]);

  useEffect(() => {
    filterAppointments();
  }, [filterAppointments]);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAppointments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments');
    XLSX.writeFile(workbook, 'Appointments.xlsx');
  };

  return (
    <div className="p-8">
      <h1 className="text-center text-3xl font-semibold mb-8 text-teal-600">
        Appointments List
      </h1>

      {/* Filter Options */}
      <div className="text-center mb-4">
        <label htmlFor="filter" className="mr-4 text-lg">
          Filter by Date:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="p-2 border rounded-md border-gray-300"
        >
          <option value="All">All</option>
          <option value="Today">Today</option>
        </select>
        <button
          onClick={handleExport}
          className="ml-4 p-2 rounded-md bg-teal-600 text-white hover:bg-teal-700"
        >
          Export to Excel
        </button>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <p className="text-center text-lg">No appointments found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Header Row */}
          <div className="flex flex-row font-bold bg-teal-100 p-2 rounded-md shadow-sm gap-4">
            <div className="w-1/12">SL</div>
            <div className="w-2/12">Name</div>
            <div className="w-2/12">Phone</div>
            <div className="w-2/12">Email</div>
            <div className="w-3/12">Appointment Date</div>
            <div className="w-2/12">Service</div>
            <div className="w-3/12">Additional Requirement</div>
          </div>
          {/* Data Rows */}
          {filteredAppointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className="flex flex-row bg-white p-4 rounded-md shadow-md gap-4"
            >
              <div className="w-1/12">{index + 1}</div>
              <div className="w-2/12">{appointment.name}</div>
              <div className="w-2/12">{appointment.phone}</div>
              <div className="w-2/12">{appointment.email}</div>
              <div className="w-3/12">{appointment.appointmentDate}</div>
              <div className="w-2/12">{appointment.service}</div>
              <div className="w-3/12">{appointment.additionalRequirement}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;

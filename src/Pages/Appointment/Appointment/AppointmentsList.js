import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import * as XLSX from 'xlsx';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 10;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'appointments'));
        const appointmentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
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
    } else if (filter === 'ThisMonth') {
      const currentMonth = today.getMonth();
      filteredData = appointments.filter(
        appointment => new Date(appointment.appointmentDate).getMonth() === currentMonth
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

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
          <option value="ThisMonth">This Month</option>
        </select>
        <button
          onClick={handleExport}
          className="ml-4 p-2 rounded-md bg-teal-600 text-white hover:bg-teal-700"
        >
          Export to Excel
        </button>
      </div>

      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : filteredAppointments.length === 0 ? (
        <p className="text-center text-lg">No appointments found.</p>
      ) : (
        <div>
          <div className="hidden md:flex flex-row font-bold bg-teal-100 p-2 rounded-md shadow-sm gap-4">
            <div className="w-1/12">SL</div>
            <div className="w-2/12">Name</div>
            <div className="w-2/12">Phone</div>
            <div className="w-2/12">Email</div>
            <div className="w-3/12">Appointment Date</div>
            <div className="w-2/12">Service</div>
            <div className="w-3/12">Additional Requirement</div>
          </div>

          {currentAppointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className="flex flex-col md:flex-row bg-white p-4 rounded-md shadow-md gap-4 mb-4"
            >
              <div className="md:w-1/12">{index + 1}</div>
              <div className="md:w-2/12">{appointment.name}</div>
              <div className="md:w-2/12">{appointment.phone}</div>
              <div className="md:w-2/12">{appointment.email}</div>
              <div className="md:w-3/12">{appointment.appointmentDate}</div>
              <div className="md:w-2/12">{appointment.service}</div>
              <div className="md:w-3/12">{appointment.additionalRequirement}</div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
            {[...Array(Math.ceil(filteredAppointments.length / appointmentsPerPage))].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;

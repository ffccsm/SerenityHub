import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaClinicMedical, FaPrescriptionBottle, FaHeartbeat, FaCapsules, FaHandsHelping, FaFirstAid } from 'react-icons/fa';

const services = [
  { name: 'Addiction Treatment', price: 'BDT 8999', description: 'A comprehensive approach to overcoming addiction.', icon: <FaPrescriptionBottle /> },
  { name: 'Drug Rehab', price: 'BDT 8999', description: 'Effective rehabilitation programs to assist in recovery.', icon: <FaCapsules /> },
  { name: 'Programmes', price: 'BDT 8999', description: 'Various tailored programs for personalized care.', icon: <FaHeartbeat /> },
  { name: 'Detoxification', price: 'BDT 8999', description: 'Safe and supervised detox programs for a fresh start.', icon: <FaFirstAid /> },
  { name: 'Therapies', price: 'BDT 8999', description: 'Individual and group therapy sessions to foster healing.', icon: <FaClinicMedical /> },
  { name: 'Aftercare', price: 'BDT 8999', description: 'Ongoing support and care post-treatment to prevent relapse.', icon: <FaHandsHelping /> },
];

const Packages = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const toggleModal = (service) => {
    setSelectedService(service);
    setModalOpen(!isModalOpen);
  };

  const handleBookNow = () => {
    navigate(`/appointment`); // Redirect to the appointment booking page
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">Available Treatment Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="card border bg-white shadow-xl transform hover:scale-105 transition-transform rounded-lg"
          >
            <div className="p-6">
              {/* Service Icon */}
              <div className="flex justify-center mb-4 text-4xl text-blue-500">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">{service.name}</h3>
              <p className="text-center text-2xl font-bold text-gray-900 mb-4">
                Price: {service.price}
              </p>

              {/* Short Description */}
              <p className="text-center text-gray-600 mb-4">{service.description}</p>

              {/* Progress Bar for Availability */}
              <p className="text-gray-600 text-center mb-4">Spaces Available: 15</p>
              <div className="relative pt-1 mb-4">
                <div className="overflow-hidden h-2 text-xs flex bg-blue-200 rounded">
                  <div style={{ width: '75%' }} className="bg-blue-600 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
                </div>
              </div>

              {/* View More Button */}
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => toggleModal(service)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for More Info */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => toggleModal(null)}
            >
              ✖️
            </button>

            <h3 className="text-xl font-bold mb-4">{selectedService.name}</h3>
            <p className="mb-4 text-gray-700">{selectedService.description}</p>
            <p className="font-semibold text-lg">Price: {selectedService.price}</p>

            {/* Book Now Button */}
            <div className="mt-6">
              <button
                className="btn btn-success w-full"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;

import React, { useState } from 'react';

const packages = [
  {
    name: 'Package 1 - Basic',
    price: 'BDT 21,999 / Month',
    color: 'bg-yellow-100 border-yellow-300',
    facilities: [
      'Shared Room Accommodation',
      'Group Therapy',
      'Basic Counselling',
      'Standard Meals',
      'Shared TV',
      'Non-AC',
      '3 Bed Sharing',
    ],
  },
  {
    name: 'Package 2 - Medium',
    price: 'BDT 29,999 / Month',
    color: 'bg-blue-100 border-blue-300',
    facilities: [
      'Private Room Accommodation',
      'Advanced Treatment',
      'Individual Counseling',
      'Healthy Food Options',
      'Personal TV',
      'AC Room',
      '2 Bed Sharing',
      'Separate Bathroom',
    ],
  },
  {
    name: 'Package 3 - Premium',
    price: 'BDT 39,999 / Month',
    color: 'bg-green-100 border-green-300',
    facilities: [
      'Luxury Private Room',
      'Personalized Therapy Plan',
      '24/7 Counselling',
      'Gourmet Meals',
      'Private TV and Entertainment',
      'AC Room',
      '1 Bed Suite',
      'Attached Private Bathroom',
      'Exclusive Services',
    ],
  },
];

const TreatmentDetails = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const redirectTo = (path) => {
    window.location.href = `/treatment/${path}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Treatment Packages</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`card border ${pkg.color} shadow-xl transform hover:scale-105 transition-transform`}
          >
            <div className="p-6">
              {/* Pricing Info */}
              <h3 className="text-xl font-semibold text-center mb-2">{pkg.name}</h3>
              <p className="text-center text-2xl font-bold text-gray-900 mb-4">{pkg.price}</p>

              {/* Facility List */}
              <ul className="list-disc list-inside space-y-2">
                {pkg.facilities.map((facility, idx) => (
                  <li key={idx} className="text-gray-700 font-bold">
                    {facility}
                  </li>
                ))}
              </ul>
            </div>

            {/* Want to Know More Button */}
            <div className="card-actions justify-center p-4">
              <button className="btn btn-primary w-full" onClick={toggleModal}>
                Want to know More!
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for More Info */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleModal}
            >
              ✖️
            </button>
            <h3 className="text-xl font-bold mb-4">Explore More Services</h3>
            <div className="grid grid-cols-2 gap-4">
              {['AddictionTreatment', 'Aftercare', 'Detoxification', 'DrugRehab', 'Programmes', 'Therapies'].map((service) => (
                <button
                  key={service}
                  className="btn btn-secondary w-full"
                  onClick={() => redirectTo(service)}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentDetails;

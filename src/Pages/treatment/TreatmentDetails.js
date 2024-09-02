import React from 'react';
import { Link } from 'react-router-dom';
import AddictionTreatment from '..///treatment/AddictionTreatment';
import DrugRehab from '..///treatment/DrugRehab';
import Programmes from '..///treatment/Programmes';
import Detoxification from '..///treatment/Detoxification';
import Therapies from '..///treatment/Therapies';
import Aftercare from '..///treatment/Aftercare';

const services = [
  { name: 'Addiction Treatment', path: '/treatment/AddictionTreatment', component: AddictionTreatment },
  { name: 'Drug Rehab', path: '/treatment/DrugRehab', component: DrugRehab },
  { name: 'Programmes', path: '/treatment/Programmes', component: Programmes },
  { name: 'Detoxification', path: '/treatment/Detoxification', component: Detoxification },
  { name: 'Therapies', path: '/treatment/Therapies', component: Therapies },
  { name: 'Aftercare', path: '/treatment/Aftercare', component: Aftercare },
];

const TreatmentDetails = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Our Treatment</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="relative bg-white border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <Link to={service.path} className="block h-full">
              <div className="p-6">
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="mt-2 text-gray-600">Click for details</p>
              </div>
              <div className="absolute inset-0 bg-black opacity-30 flex items-center justify-center text-white text-lg font-bold">
                Click for details
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentDetails;

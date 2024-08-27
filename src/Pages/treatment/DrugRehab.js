import React from 'react';

const DrugRehab = () => {
  return (
    <div className="service-page p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold" style={{ color: '#0FCFEC' }}>Drug Rehab</h1>
        <img 
          src="https://picsum.photos/800/400?random=3" 
          alt="Drug Rehab Service" 
          className="w-full h-80 object-cover mt-4"
        />
      </header>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">What is Drug Rehab?</h2>
        <p>
          Drug rehabilitation is a comprehensive program designed to help individuals recover from substance use disorders. It includes medical detoxification, therapy, counseling, and support services to address both the physical and psychological aspects of addiction.
        </p>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Benefits of Drug Rehab</h2>
        <ul className="list-disc pl-6">
          <li>Comprehensive treatment approach</li>
          <li>Access to medical and psychological support</li>
          <li>Structured environment for recovery</li>
          <li>Skills and tools for long-term sobriety</li>
        </ul>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs about Drug Rehab</h2>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What is Drug Rehab?</p>
          <p>
            Drug rehab is a structured program designed to help individuals overcome drug addiction. It provides a combination of medical care, therapy, and support to assist in the recovery process.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What can you expect from Drug Rehab?</p>
          <p>
            Expect a structured program that includes detoxification, therapy sessions, group counseling, and support. The goal is to address addiction's root causes and equip individuals with the tools for recovery.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">A typical day in Drug Rehab</p>
          <p>
            A typical day includes scheduled therapy sessions, group activities, individual counseling, and medical check-ups. The routine is designed to support recovery and promote a healthy lifestyle.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What happens after you leave rehab?</p>
          <p>
            After leaving rehab, individuals are usually recommended to continue with outpatient therapy and support groups. Transitioning back to daily life is supported by ongoing counseling and recovery plans.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DrugRehab;

import React from 'react';

const Programmes = () => {
  return (
    <div className="service-page p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold" style={{ color: '#0FCFEC' }}>Rehab Programmes</h1>
        <img 
          src="https://i.postimg.cc/2SL2Htv9/Rehab-Programmes.jpg" 
          alt="Rehab Programmes Service" 
          className="w-full h-[30rem] object-cover rounded-lg shadow-lg"
        />
      </header>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">What are Rehab Programmes?</h2>
        <p>
          Rehab programmes are structured plans designed to help individuals recover from substance abuse and addiction. They offer a combination of therapeutic techniques, medical support, and lifestyle training to address addiction from multiple angles.
        </p>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Benefits of Rehab Programmes</h2>
        <ul className="list-disc pl-6">
          <li>Customized treatment plans</li>
          <li>Access to a variety of therapies</li>
          <li>Support from a multidisciplinary team</li>
          <li>Focus on long-term recovery and relapse prevention</li>
        </ul>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs about Rehab Programmes</h2>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What are Rehab Programmes?</p>
          <p>
            Rehab programmes are comprehensive treatment plans that combine medical, therapeutic, and support services to help individuals overcome addiction and achieve long-term recovery.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What can you expect from Rehab Programmes?</p>
          <p>
            Expect a structured approach that includes therapy sessions, medical care, group support, and educational components aimed at addressing the root causes of addiction and fostering sustainable recovery.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">A typical day in a Rehab Programme</p>
          <p>
            A typical day involves scheduled therapy sessions, group activities, individual counseling, and educational workshops. The schedule is designed to provide a balanced approach to recovery and personal growth.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What happens after you complete a Rehab Programme?</p>
          <p>
            After completing a rehab programme, individuals are encouraged to continue with outpatient support, attend follow-up therapy, and engage in support groups to maintain their progress and prevent relapse.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Programmes;

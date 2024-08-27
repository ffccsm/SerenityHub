import React from 'react';

const Detoxification = () => {
  return (
    <div className="service-page p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold" style={{ color: '#0FCFEC' }}>Detoxification</h1>
        <img 
          src="https://picsum.photos/800/400?random=2" 
          alt="Detoxification Service" 
          className="w-full h-80 object-cover mt-4"
        />
      </header>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">What is Detoxification?</h2>
        <p>
          Detoxification is the initial phase of addiction treatment, where the body is cleansed of harmful substances. It involves medical supervision to manage withdrawal symptoms and ensure the safety of the individual during this critical phase. Detox is often followed by further therapeutic interventions.
        </p>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Benefits of Detoxification</h2>
        <ul className="list-disc pl-6">
          <li>Safe and medically supervised withdrawal</li>
          <li>Reduction of physical dependence on substances</li>
          <li>Preparation for further treatment and therapy</li>
          <li>Support in managing withdrawal symptoms</li>
        </ul>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs about Detoxification</h2>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What is Detoxification?</p>
          <p>
            Detoxification is the process of removing toxins from the body, often as the first step in addiction treatment. It involves medical support to safely manage withdrawal symptoms and prepare the individual for continued care.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What can you expect from Detoxification?</p>
          <p>
            Expect a medically supervised environment where withdrawal symptoms are managed, and your body is stabilized. The process includes regular health monitoring and support to ensure a safe transition.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">A typical day in Detoxification</p>
          <p>
            A typical day includes medical check-ups, monitoring of withdrawal symptoms, and supportive care. Activities are focused on comfort and safety, with a structured routine to aid in the detox process.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What happens after you leave detox?</p>
          <p>
            After detox, individuals are typically referred to ongoing treatment and therapy to address the underlying issues of addiction. Detox is just the beginning, and continued support is crucial for long-term recovery.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Detoxification;

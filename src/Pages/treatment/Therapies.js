import React from 'react';

const Therapies = () => {
  return (
    <div className="service-page p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold" style={{ color: '#0FCFEC' }}>Therapies</h1>
        <img 
          src="https://i.postimg.cc/q78QrC18/Therapies.jpg" 
          alt="Therapies Service" 
          className="w-full h-[35rem] object-cover rounded-lg shadow-lg"
        />
      </header>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">What are Therapies?</h2>
        <p>
          Therapies are a range of treatments used to address mental health issues, emotional struggles, and behavioral challenges. In addiction treatment, various therapeutic methods help individuals understand and overcome their dependencies.
        </p>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Benefits of Therapies</h2>
        <ul className="list-disc pl-6">
          <li>Provides emotional support</li>
          <li>Helps in understanding the root causes of addiction</li>
          <li>Encourages personal growth and self-awareness</li>
          <li>Offers coping strategies and tools for recovery</li>
        </ul>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs about Therapies</h2>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What are Therapies?</p>
          <p>
            Therapies are structured interventions designed to support individuals in managing mental health challenges and addiction. They include various methods such as cognitive-behavioral therapy, group therapy, and individual counseling.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What can you expect from Therapies?</p>
          <p>
            Expect a supportive environment where you'll engage in different therapeutic practices. These sessions are aimed at addressing underlying issues, building coping skills, and fostering a healthier mindset.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">A typical session in Therapies</p>
          <p>
            A typical therapy session includes discussion of personal challenges, exploring emotional responses, and developing strategies for improvement. Sessions may also involve exercises and activities designed to enhance well-being.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What happens after you complete Therapy?</p>
          <p>
            After completing therapy, individuals are encouraged to apply the skills learned in their daily lives and continue with follow-up support. Regular check-ins and ongoing practice help maintain progress and manage challenges.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Therapies;

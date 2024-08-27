import React from 'react';

const Aftercare = () => {
  return (
    <div className="service-page p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold" style={{ color: '#0FCFEC' }}>Aftercare</h1>
        <img 
          src="https://picsum.photos/800/400?random=1" 
          alt="Aftercare Service" 
          className="w-full h-80 object-cover mt-4"
        />
      </header>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">What is Aftercare?</h2>
        <p>
          Aftercare is a vital phase of the recovery process designed to provide ongoing support and assistance after the completion of initial treatment. It aims to help individuals maintain their progress, cope with challenges, and reintegrate into their daily lives. This stage often involves continued therapy, support groups, and other resources tailored to support sustained recovery.
        </p>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Benefits of Aftercare</h2>
        <ul className="list-disc pl-6">
          <li>Ongoing emotional and psychological support</li>
          <li>Techniques for managing daily stressors</li>
          <li>Access to a network of supportive individuals</li>
          <li>Tools for preventing relapse</li>
        </ul>
      </section>
      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs about Aftercare</h2>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What is Aftercare?</p>
          <p>
            Aftercare encompasses the continued support and services provided after the primary treatment for addiction. It includes follow-up therapy, participation in support groups, and other resources to aid in long-term recovery.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What can you expect from Aftercare?</p>
          <p>
            Expect a structured plan that includes regular check-ins, therapy sessions, and engagement in support groups. Aftercare aims to offer tools and strategies to help manage life after treatment and maintain recovery.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">A typical day in Aftercare</p>
          <p>
            A typical day might involve attending scheduled therapy sessions, participating in support groups, and engaging in activities that promote well-being and recovery. It’s about integrating the lessons learned during treatment into everyday life.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-blue-600">What happens after you leave rehab?</p>
          <p>
            After leaving rehab, Aftercare helps with the transition back into daily life by providing continued support and resources. This phase helps individuals address challenges and stay committed to their recovery goals.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Aftercare;

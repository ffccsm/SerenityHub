import React from 'react';

const AddictionTreatment = () => {
  return (
    <div className="service-page bg-gray-100 p-6 md:p-12">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#0FCFEC] mb-4">Addiction Treatment</h1>
      </header>

      <section className="image-card mb-12">
        <img 
          src="https://i.postimg.cc/5yPnGdnT/Addiction-Treatment.jpg" 
          alt="Addiction Treatment" 
          className="w-full h-[24rem] object-cover rounded-lg shadow-lg"
          style={{ maxWidth: 'calc(100% )' }} // Adjusts left and right margins
        />
        <p className="mt-4 text-lg text-gray-700">
          Comprehensive addiction treatment programs to support recovery and wellness.
        </p>
      </section>

      <section className="description bg-white p-6 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">What is Addiction Treatment?</h2>
        <p className="text-lg text-gray-700">
          Addiction treatment is a multifaceted approach designed to help individuals overcome substance abuse or behavioral dependencies. It addresses both the psychological and physical aspects of addiction, providing a structured environment for recovery. Programs may include detoxification to safely manage withdrawal symptoms, followed by therapy to address underlying issues and develop coping strategies. Treatment plans are tailored to meet each individual's unique needs, often involving a combination of inpatient care, outpatient support, and community resources. The goal is to empower individuals to achieve long-term sobriety and improve their overall quality of life.
        </p>
      </section>

      <section className="benefits bg-white p-6 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Benefits of Addiction Treatment</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li className="mb-2">**Personalized Care Plans:** Tailored treatment strategies to address the specific needs and circumstances of each individual.</li>
          <li className="mb-2">**24/7 Support:** Continuous care and supervision to ensure safety and provide support throughout the recovery process.</li>
          <li className="mb-2">**Evidence-Based Therapies:** Utilization of proven therapeutic methods to address addiction and its underlying causes.</li>
          <li className="mb-2">**Holistic Approach:** Integration of physical, emotional, and social support to promote comprehensive healing.</li>
          <li className="mb-2">**Aftercare Planning:** Assistance in transitioning from treatment to everyday life, including ongoing support and relapse prevention strategies.</li>
        </ul>
      </section>

      <section className="articles bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#0FCFEC]">Addiction Treatment?</h3>
          <p className="text-lg text-gray-700">
            Addiction treatment is a comprehensive process that involves various therapeutic techniques and medical interventions to help individuals overcome their addiction. It focuses on both the physical and psychological aspects of addiction, offering support through detoxification, therapy, and ongoing care. Treatment aims to address the root causes of addiction, provide strategies for coping with cravings, and build a foundation for long-term recovery.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#0FCFEC]">What can you expect from Addiction Treatment?</h3>
          <p className="text-lg text-gray-700">
            During addiction treatment, you can expect a structured and supportive environment where you'll receive medical care, therapy, and counseling. Treatment may involve individual and group therapy sessions, educational workshops, and skill-building activities. The program is designed to help you understand your addiction, develop coping mechanisms, and make positive changes in your life.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#0FCFEC]">A typical day in Addiction Treatment.</h3>
          <p className="text-lg text-gray-700">
            A typical day in addiction treatment starts with a morning routine that includes individual or group therapy sessions. You may participate in various activities such as counseling, educational seminars, and skill-building exercises. The day often includes recreational activities, time for self-reflection, and meetings with your support network. Each day's schedule is designed to support your recovery and personal growth.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#0FCFEC]">What happens after you leave rehab?</h3>
          <p className="text-lg text-gray-700">
            After leaving rehab, it’s crucial to continue with aftercare and support services to maintain your recovery. This may include ongoing therapy, support groups, and regular follow-up appointments. You’ll need to build a strong support network, set personal goals, and make lifestyle changes to prevent relapse and promote long-term sobriety.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AddictionTreatment;

import React from 'react';

const About = () => {
    return (
        <div className='w-full max-w-7xl mx-auto px-5 py-10'>
            {/* Chairman Message Section */}
            <div className='mb-20 flex justify-center'>
                <div className="card bg-base-100 shadow-xl" style={{ width: '960px', height: '720px' }}>
                    <figure>
                        <img className="rounded-lg mt-4" src="https://i.ibb.co/vhMtk4s/ceo-photo.jpg" alt="Chairman" style={{ maxWidth: '100%', height: 'auto' }} />
                    </figure>
                    <div className="card-body text-center py-4">
                        <h2 className="card-title text-xl">John Doe, Chairman</h2>
                        <p className='text-base'>
                            As Chairman, I am dedicated to ensuring we offer top-notch care for our clients. Our team is committed to creating a supportive environment where healing and recovery happen. Together, we build a community of hope and transformation.
                        </p>
                    </div>
                </div>
            </div>

            {/* Rehab Center Details Section */}
            <div className='mb-16'>
                <h3 className='text-2xl font-bold text-primary'>About Our Rehab Center</h3>
                <p className='text-lg mt-4'>
                    Serenity Hub is a premier rehabilitation center providing comprehensive care for addiction and mental health challenges. Our safe and nurturing environment offers individualized treatment plans and a team of experienced professionals to help clients achieve long-term recovery.
                </p>
            </div>

            {/* Rehab Center Benefits Section */}
            <div className='mb-16'>
                <h3 className='text-2xl font-bold text-primary'>Benefits of Our Rehab Center</h3>
                <ul className='list-disc ml-5 mt-4 text-lg'>
                    <li>Individualized treatment plans tailored to each client</li>
                    <li>24/7 medical and psychological support</li>
                    <li>Experienced and certified professionals</li>
                    <li>Safe and serene environment for recovery</li>
                    <li>Holistic approach: mental, physical, and emotional well-being</li>
                </ul>
            </div>

            {/* Mission and Vision Section */}
            <div className='mb-16'>
                <h3 className='text-2xl font-bold text-primary text-center mb-4'>Our Mission & Vision</h3>
                <p className='text-lg text-center mx-auto max-w-3xl'>
                    <strong>Mission:</strong> Our mission is to help individuals reclaim their lives through compassionate, evidence-based care that promotes long-term recovery. We create a supportive environment to overcome addiction and mental health challenges.
                </p>
                <p className='text-lg text-center mx-auto max-w-3xl mt-4'>
                    <strong>Vision:</strong> Our vision is to lead in the rehabilitation sector, inspiring hope and facilitating meaningful change. We aim to set the standard for holistic, patient-centered care and continuously enhance our services.
                </p>
            </div>

            {/* Success and Fail Rate Section */}
            <div className='mb-16'>
                <h3 className='text-2xl font-bold text-primary text-center mb-4'>Our Success & Fail Rates</h3>
                <div className='flex justify-center gap-8'>
                    {/* Column Progress Bar for Success */}
                    <div className='w-1/2 md:w-1/3'>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-green-600 bg-green-200 uppercase last:mr-0 mr-2">
                                    85%
                                </span>
                            </div>
                            <div className="flex">
                                <div className="relative flex-grow">
                                    <div className="flex h-2 mb-4 overflow-hidden text-xs flex-col bg-gray-200 rounded">
                                        <div style={{ width: '85%' }} className="flex flex-col text-center text-white justify-center bg-green-500 shadow"></div>
                                    </div>
                                </div>
                            </div>
                            <p className='text-center text-lg mt-2'>Success Rate</p>
                        </div>
                    </div>

                    {/* Column Progress Bar for Fail */}
                    <div className='w-1/2 md:w-1/3'>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-2">
                                    15%
                                </span>
                            </div>
                            <div className="flex">
                                <div className="relative flex-grow">
                                    <div className="flex h-2 mb-4 overflow-hidden text-xs flex-col bg-gray-200 rounded">
                                        <div style={{ width: '15%' }} className="flex flex-col text-center text-white justify-center bg-red-500 shadow"></div>
                                    </div>
                                </div>
                            </div>
                            <p className='text-center text-lg mt-2'>Fail Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

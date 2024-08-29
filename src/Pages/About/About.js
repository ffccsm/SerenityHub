import React from 'react';

const About = () => {
    return (
        <div className='w-full max-w-7xl mx-auto px-5 py-10'>
            {/* Chairman Message Section */}
            <div className='mb-20'>
                <div className='text-center mb-10'>
                    <h2 className='text-5xl font-bold mb-4 relative'>
                        <span style={{ position: 'relative', padding: '0 15px' }}>
                            <span style={{ borderBottom: '5px solid #00aaff', marginRight: '10px' }}></span>
                            ABOUT SERENITYHUB
                            <span style={{ borderBottom: '5px solid #00aaff', marginLeft: '10px' }}></span>
                        </span>
                    </h2>
                    <h3 className='text-4xl font-semibold mt-2'>Message from Founder Chairman</h3>
                </div>

                {/* Grid for Chairman's Quote and Image */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20'>
                    <div>
                        <blockquote className='text-2xl font-light italic'>
                            "Rehabilitation is not just about recovery; it’s about rediscovering life, rebuilding hope, and becoming stronger than ever before."
                        </blockquote>
                    </div>
                    <div className='relative'>
                        <img
                            src="https://i.postimg.cc/PfK3NYTy/Chairman2.png"
                            alt="Chairman"
                            className='w-full md:w-auto md:max-w-sm rounded-lg'
                            style={{
                                opacity: 0.8,
                                transform: 'scale(1.1)'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Add More Space Between Sections */}
            <div className='mb-32'>
                <h3 className='text-2xl font-bold text-primary'>About Our Rehab Center</h3>
                <p className='text-lg mt-4'>
                    Serenity Hub is a premier rehabilitation center providing comprehensive care for addiction and mental health challenges...
                </p>
            </div>

            <div className='mb-16'>
                <h3 className='text-2xl font-bold text-primary'>Benefits of Our Rehab Center</h3>
                <ul className='list-disc ml-5 mt-4 text-lg'>
                    <li>Individualized treatment plans tailored to each client...</li>
                </ul>
            </div>

            <div className='mb-16'>
                <h3 className='text-2xl font-bold text-primary text-center mb-4'>Our Mission & Vision</h3>
                <p className='text-lg text-center mx-auto max-w-3xl'>
                    <strong>Mission:</strong> Our mission is to help individuals reclaim their lives through compassionate, evidence-based care...
                </p>
                <p className='text-lg text-center mx-auto max-w-3xl mt-4'>
                    <strong>Vision:</strong> Our vision is to lead in the rehabilitation sector, inspiring hope and facilitating meaningful change...
                </p>
            </div>

            <div className='mb-16'>
                <h3 className='text-2xl font-bold text-primary text-center mb-4'>Our Success & Fail Rates</h3>
                <div className='flex justify-center gap-8'>
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

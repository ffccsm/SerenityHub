import React from 'react';
import physical from '../../../images/physical1.png';
import occupational from '../../../images/physiotherapist.png';
import cognitive from '../../../images/cognitive.png';
import Service from './Service';
import Lottie from "lottie-react";
import dental from '../Home/Lottie/dentalcare.json';
const Services = () => {

    const serviceItem=[
        
        {
            id: 1,
            name: 'Physical Therapy',
            description: 'Physical therapy sessions involve various exercises and techniques tailored to your specific needs, administered by a trained therapist. These sessions aim to improve mobility, reduce pain, and enhance overall physical function.',
            icon: physical  
            },
            {
            id: 2,
            name: 'Occupational Therapy',
            description: 'Occupational therapy focuses on helping individuals regain independence in daily activities such as self-care, work, and leisure. Therapists use specialized techniques and adaptive strategies to address physical and cognitive challenges.',
            icon: occupational
            },
            {
            id: 3,
            name: 'Cognitive Rehabilitation',
            description: 'Cognitive rehabilitation involves targeted exercises and activities designed to improve cognitive functions such as memory, attention, and problem-solving. This therapy helps individuals regain cognitive skills lost due to injury or illness.',
            icon: cognitive
            }
    ]
    return (
        <div className='mt-10 py-10'>
            <div className='text-center'>
            <Lottie animationData={dental} loop={true} className='lg:w-20 rounded mx-auto'/>
                <h3 className='text-3xl font-semibold text-primary'>Our Services</h3>

                <h2 className='text-2xl '>Services We provide</h2>
                
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 my-10'>
                {
                   serviceItem.map(service=><Service key={service.id} service={service}></Service>) 
                }
            </div>
        </div>
    );
};

export default Services;
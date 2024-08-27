import React from 'react';
import physical from '../../../images/physical1.png';
import occupational from '../../../images/physiotherapist.png';
import cognitive from '../../../images/cognitive.png';
import speech from '../../../images/speech.png';
import vocational from '../../../images/vocational.png';
import recreational from '../../../images/recreational.png';
import Service from './Service';
import Lottie from "lottie-react";
import dental from '../Home/Lottie/dentalcare.json';
import { useMediaQuery } from 'react-responsive';

const Services = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

    const serviceItems = [
        {
            id: 1,
            name: 'Physical Therapy',
            description: 'Physical therapy sessions involve various exercises and techniques tailored to your specific needs, administered by a trained therapist. These sessions aim to improve mobility, reduce pain, and enhance overall physical function.',
            icon: physical
        },
        {
            id: 2,
            name: 'Individual Counseling',
            description: 'Every patient has their own counseling sessions in which they may talk about what bothers them and what concerns them. These sessions offer mental support and assist patients in following the right path in their recovery.',
            icon: occupational
        },
        {
            id: 3,
            name: 'Group Therapy',
            description: 'Group therapy sessions allow patients to share their experiences. This provides social support and helps them understand that they are not alone. It increases their courage and determination to overcome adversity.',
            icon: cognitive
        },
        {
            id: 4,
            name: 'Medication Management',
            description: 'Patients are given necessary medications and ensured that they are taken at the right time. This improves their physical and mental health status during recovery.',
            icon: speech
        },
        {
            id: 5,
            name: 'Biofeedback Therapy',
            description: 'Biofeedback therapy teaches patients how to control their bodily functions, such as heart rate and breathing. This helps reduce stress and improve physical condition.',
            icon: vocational
        },
        {
            id: 6,
            name: 'Aftercare Services',
            description: 'After initial recovery, patients are offered follow-up care to prevent recurrence. These services include follow-up meetings, support groups, and recovery programs.',
            icon: recreational
        }
    ];

    // Conditionally render fewer services for mobile devices
    const servicesToRender = isMobile ? serviceItems.slice(0, 3) : serviceItems;

    return (
        <div className='mt-10 py-10'>
            <div className='text-center mb-10'>
                <Lottie animationData={dental} loop={true} className='w-60 h-60 rounded mx-auto'/>
                <h3 className='text-3xl font-semibold text-primary'>Our Services</h3>
                <h2 className='text-2xl mt-2'>Services We Provide</h2>
            </div>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 px-4'>
                {servicesToRender.map(service => (
                    <Service key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default Services;

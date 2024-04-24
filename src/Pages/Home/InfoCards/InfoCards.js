import React from 'react';
import clock from '../../../icons/clock.svg';
import marker from '../../../icons/marker.svg';
import phone from '../../../icons/phone.svg';
import InfoCard from './InfoCard';
import Lottie from "lottie-react";
import contact from  '../Home/./Lottie/customer.json';



const InfoCards = () => {

    const cardData=[
        {
            id:1,
            name:'Opening Hours',
            description:'Open 10.00 am to 9.00 pm everyday. Except Saturday.',
            icon:clock,
            bgClass:'bg-primary'
        },
        {
            id:2,
            name:'Our Location',
            description:'Pallabi,Dhaka-1216',
            icon:marker,
            bgClass:'bg-secondary'
        },
        {
            id:3,
            name:'Contact',
            description:'+8809638700900',
            icon:phone,
            bgClass:'bg-primary'
        }

    ]
    return (
        <div className='pt-10'>
            <h2 className='mb-10 text-3xl font-semibold text-primary text-center'>Customer Support</h2>
            <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 justify-center items-center px-16'>
           
           <Lottie animationData={contact} loop={true} className='lg:w-5/12 mx-auto rounded'/>
           

            
                
            <p className='text-start'>
            Regular rehabilitation sessions are crucial for maintaining optimal physical and mental health and preventing serious functional impairments. Rehabilitation professionals can identify and address issues early, thus preventing the progression of more severe conditions. If you are experiencing pain or other symptoms related to your physical or cognitive abilities, it is imperative to seek rehabilitation services promptly. Early intervention can mitigate worsening symptoms and improve overall outcomes.
            </p>
           
            </div>
            <div className='grid gap-6 mt-12 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
            {
                cardData.map(card=><InfoCard key={card.id} card={card}></InfoCard>)
            }
        </div>
        </div>
    );
};

export default InfoCards;
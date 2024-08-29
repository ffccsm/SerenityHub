import React from 'react';
import clock from '../../../icons/clock.svg';
import marker from '../../../icons/marker.svg';
import phone from '../../../icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {
    const cardData = [
        {
            id: 1,
            name: 'Opening Hours',
            description: 'Open 10.00 am to 9.00 pm everyday. Except Saturday.',
            icon: clock,
            bgClass: 'bg-primary'
        },
        {
            id: 2,
            name: 'Our Location',
            description: 'Pallabi, Dhaka-1216',
            icon: marker,
            bgClass: 'bg-secondary'
        },
        {
            id: 3,
            name: 'Contact',
            description: '+8809638700900',
            icon: phone,
            bgClass: 'bg-primary'
        }
    ];

    return (
        <div className='pt-10'>
            <h2 className='mb-10 text-3xl font-semibold text-primary text-center'>Contact Us</h2>
            <div className='grid gap-6 mt-12 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                {
                    cardData.map(card => <InfoCard key={card.id} card={card} />)
                }
            </div>
        </div>
    );
};

export default InfoCards;

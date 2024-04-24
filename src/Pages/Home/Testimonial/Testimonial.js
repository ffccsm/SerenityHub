import React from 'react';
import quote from '../../../icons/quote.svg';
import people1 from '../../../images/people1.png';
import people2 from '../../../images/people2.png';
import people3 from '../../../images/people3.png';
import Review from './Review';

const Testimonial = () => {

    const reviews=[
        {
            _id:1,
            name:'Salam Kabir',
            location:'Dhaka',
            rev:'Rehab center review: Layout, cleanliness, staff, programs, success rates, patient experiences—all crucial. Detailed insights vital for informed decisions.            ',
            img:people1
        },
        {
            _id:2,
            name:'Jannat Shoma',
            location:'Tangail',
            rev:'Clean, organized layout. Professional staff. Effective programs. High success rates. Patient experiences positive. Detailed insights aid informed decisions.',
            img:people2 
        },
        {
            _id:3,
            name:'Aisha Yamin',
            location:'Noakhali',
            rev:'Outstanding service! Prompt, courteous, and efficient. Exceeded expectations in every aspect. Highly recommended for anyone seeking top-notch assistance.',
            img:people3 
        }
    ]

    return (
        <section className='py-16 mt-6'>
            <div className='flex justify-between'>
                <div className='text-start ml-3'>
                    <h5 className='text-lg text-primary font-bold uppercase'>Testimonial</h5>
                    <h2 className='text-2xl font-bold'>What Our Patients Say</h2>
                </div>
                <figure>
                    <img src={quote} className='sm:w-24 lg:w-48' alt='quote'/>
                </figure>
            </div>
            <div className='grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                {
                    reviews.map(review=><Review key={review._id} review={review}></Review>)
                }
            </div>
        </section>
    );
};

export default Testimonial;
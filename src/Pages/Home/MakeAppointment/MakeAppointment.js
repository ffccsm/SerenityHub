import React from 'react';
import doctor from '../../../images/doctor.png';
import appointment from '../../../images/appointment.png';
import PrimaryButton from '../../../MyComponent/PrimaryButton';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import care from '../Home/Lottie/dentist.json';
const MakeAppointment = () => {

    return (
        <div>
            <div className='py-10'>
            <h4 className='text-3xl text-center text-primary font-semibold'>Appointment</h4>
            <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-10 justify-center items-center px-10'>
                <p className='text-start'>
                A rehabilitation appointment is a scheduled visit to a rehabilitation professional to receive personalized care services aimed at improving physical and cognitive function. The appointment may be for routine assessments, therapy sessions, or to address specific rehabilitation goals or concerns. During a rehabilitation appointment, the professional will conduct a thorough evaluation of your abilities, assess your progress, and may utilize diagnostic tools such as assessments or tests to tailor your treatment plan. They will also review your rehabilitation history and any symptoms or challenges you may be facing.
                </p>

                <Lottie animationData={care} loop={true} className='lg:w-10/12 rounded mx-auto'/>
            </div>
            </div>


            <section className='mt-10' style={{
            background:`url(${appointment})`,
            backgroundSize: "cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center"
        }}>

            
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row -mb-4">
                    <img src={doctor} alt='doctor' className="lg:w-1/2 rounded-lg shadow-2xl -mt-32 hidden md:block lg:block" />
                    <div className='text-white'>
                        
                        <h1 className="text-4xl font-bold">Make an Appointment Today!</h1>
                        <p className="py-6">
                        Entering rehabilitation can be an anxiety-inducing experience for many individuals, yet it's crucial to adhere to regular rehabilitation appointments to sustain optimal physical and cognitive well-being.
                        The precise protocol during a rehabilitation appointment will vary based on the nature of the appointment and the individual requirements of your rehabilitation journey.
                        </p>
                        
                        <Link to='/appointment'><PrimaryButton>Appointment</PrimaryButton></Link>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
};

export default MakeAppointment;
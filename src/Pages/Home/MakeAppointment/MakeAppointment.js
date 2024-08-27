import React from 'react';
import doctor from '../../../images/doctor.png';
import appointment from '../../../images/appointment.png';
import PrimaryButton from '../../../MyComponent/PrimaryButton';
import { Link } from 'react-router-dom';

const MakeAppointment = () => {

    return (
        <div>
            <section className='mt-10' style={{
                background: `url(${appointment})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            }}>
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row -mb-4">
                        {/* Adjusting the image width for better responsiveness */}
                        <img 
                            src={doctor} 
                            alt='doctor' 
                            className="lg:w-[600px] md:w-[500px] w-full rounded-lg shadow-2xl -mt-32 hidden md:block lg:block" 
                        />
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

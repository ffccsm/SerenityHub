import React from 'react';
import treatment from '../../../../images/treatment.png';
import PrimaryButton from '../../../../MyComponent/PrimaryButton';
import { Link } from 'react-router-dom';

const SideBanner = () => {
    return (
        <div className="hero py-10">
            <div className="hero-content flex-col lg:flex-row">
                <img src={treatment} className='lg:w-1/2 rounded-md' alt='banner' />
                <div className=''>
                    <h1 className="text-5xl font-bold">Exceptional Rehab Care, Tailored to You</h1>
                    <p className="py-6">Rehabilitation, also known as rehab medicine, is the branch of medicine focused on restoring function and improving quality of life after injury, illness, or disability. It encompasses the study, assessment, prevention, management, and treatment of conditions affecting physical and cognitive abilities, with a primary focus on restoring independence and overall well-being.</p>
                    <Link to='/treatment/TreatmentDetails'><PrimaryButton>Details</PrimaryButton></Link>
                </div>
            </div>
        </div>
    );
};

export default SideBanner;
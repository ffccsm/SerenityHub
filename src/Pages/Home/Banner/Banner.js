import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/chair.png';
import PrimaryButton from '../../../MyComponent/PrimaryButton';

import './Banner.css';

const Banner = () => {
    return (
        <div className="hero py-10 chair">
            <div className="hero-content flex-col lg:flex-row-reverse lg:px-10">
                <img src={img}  className="lg:w-1/2 rounded-lg opacity-80" alt='banner'/>
                <div>
                    <h2 className="text-5xl font-bold">এক ধাপ এক ধাপ করে,নতুন জীবন শুরু। </h2>
                    <p className="py-6"> আপনার জীবনে একটি নতুন অধ্যায় শুরু হচ্ছে। এক ধাপ এক ধাপ করে আপনি নিজেকে পুনরুদ্ধার করবেন। আমরা সবাই মানুষের জীবনে বিপদে পড়তে পারি, কিন্তু যারা এই বিপদ থেকে বের হয়ে আসার চেষ্টা করে, তারাই সত্যিকার বীর। আপনার সাহস এবং সংকল্প আপনাকে এই পথে এগিয়ে নিয়ে যাবে।
</p>
                    
                    <Link to='/appointment'><PrimaryButton>Getting Started</PrimaryButton></Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
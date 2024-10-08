import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone } from 'react-icons/fa'; // Import FontAwesome icons
import { MdLocationOn } from 'react-icons/md'; // Import Material Design icons

const Footer = () => {
    return (
        <footer className="footer p-16 bg-neutral text-neutral-content">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand Section */}
                <div className="flex flex-col items-center md:items-start">
                    <Link 
                        to="/home" 
                        className="text-4xl font-bold text-primary mb-6 cursor-pointer hover:text-secondary transition-colors duration-300"
                    >
                        SerenityHub
                    </Link>
                    <p className="text-lg md:text-xl text-center md:text-left mb-4">
                        Providing comprehensive care and support for recovery.
                    </p>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left mt-6 space-y-4">
                        <div className="flex items-center space-x-2">
                            <FaEnvelope className="text-xl text-primary" />
                            <a href="mailto:help@SerenityHub.com" className="text-lg md:text-xl">help@SerenityHub.com</a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaPhone className="text-xl text-primary" />
                            <a href="tel:+8809638700900" className="text-lg md:text-xl">+8809638700900</a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MdLocationOn className="text-xl text-primary" />
                            <span className="text-lg md:text-xl">Pallabi, Dhaka, Bangladesh</span>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="flex flex-col items-center md:items-start md:text-left">
                    <span className="footer-title text-xl mb-6">Company</span>
                    <div className="flex flex-col items-center md:items-start w-full">
                        <Link to='/home' className="link link-hover text-lg md:text-xl mb-2">Home</Link>
                        <Link to='/appointment' className="link link-hover text-lg md:text-xl mb-2">Appointment</Link>
                        <Link to='/contact' className="link link-hover text-lg md:text-xl mb-2">Contact</Link>
                        <Link to='/admin/dashboard' className="link link-hover text-lg md:text-xl mb-2">Admin Dashboard</Link>
                        <Link to='treatment/Packages' className="link link-hover text-lg md:text-xl mb-2">Our Packages </Link>
                    </div>
                </div>

                {/* Our Treatment Section */}
                <div className="flex flex-col items-center md:items-start md:text-left">
                    <span className="footer-title text-xl mb-6">Our Treatment</span>
                    <div className="flex flex-col items-center md:items-start w-full">
                        <Link to='/treatment/AddictionTreatment' className="link link-hover text-lg md:text-xl mb-2">Addiction Treatment</Link>
                        <Link to='/treatment/detoxification' className="link link-hover text-lg md:text-xl mb-2">Detoxification</Link>
                        <Link to='/treatment/programmes' className="link link-hover text-lg md:text-xl mb-2">Programmes</Link>
                        <Link to='/treatment/therapies' className="link link-hover text-lg md:text-xl mb-2">Therapies</Link>
                        <Link to='/treatment/aftercare' className="link link-hover text-lg md:text-xl mb-2">Aftercare</Link>
                        
                    </div>
                </div>

                {/* About Section */}
                <div className="flex flex-col items-center md:items-start">
                    <span className="footer-title text-xl mb-6">About</span>
                    <Link to='/about' className="link link-hover text-lg md:text-xl mb-2">About Us</Link>
                    <Link to='/meet-our-team' className="link link-hover text-lg md:text-xl mb-2">Meet Our Team</Link>

                    <div className="mt-6">
                        <p className="text-lg">Copyright © 2024 - All rights reserved by SerenityHub</p>
                        <p className="text-lg">Team SerenityHub @NUB</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

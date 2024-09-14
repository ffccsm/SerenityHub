import React, { useRef } from 'react';
import { GoMail } from 'react-icons/go'; // Updated to GoMail
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { FaTelegramPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
import './Contact.css';
import Lottie from 'lottie-react';
import contact from '../Lottie/myContact.json';

const Contact = () => {
    const form = useRef();

    const handleSendEmail = (event) => {
        event.preventDefault();

        emailjs.sendForm('service_lr53iyq', 'template_8bofxxs', form.current, '4PRlfW6Yt-jqG2WE6')
            .then((result) => {
                console.log(result.text);
                toast.success('Message sent successfully!');
            }, (error) => {
                console.log(error.text);
                toast.error('Failed to send message.');
            });
        form.current.reset();
    }

    return (
        <div className="mt-10">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-10 justify-center items-center px-10">
                <Lottie animationData={contact} loop={true} className="lg:w-7/12 mx-auto rounded" />
                <p>
                    At SerenityHub, we're here to support you every step of the way. Whether you have questions, need assistance, or want to discuss your needs with us, we offer multiple ways to get in touch:
                    <ul className="list-disc pl-5 mt-4">
                        <li><strong>Live Chat:</strong> Connect with our team instantly through our live chat option, available 24/7 for timely responses to your queries.</li>
                        <li><strong>Call Us:</strong> Reach out via phone to speak directly with our staff who are ready to assist you.</li>
                        <li><strong>Email:</strong> For detailed inquiries, email us at <a href="mailto:help@SerenityHub.com" className="text-primary">help@SerenityHub.com</a>.</li>
                        <li><strong>Inquiry Form:</strong> Fill out our form for a personalized response. Provide your details, and we will get back to you as soon as possible.</li>
                    </ul>
                </p>
            </div>

            <div className="py-16">
                <div id="contact" className="rounded banner" style={{ backgroundImage: `url("https://i.ibb.co/3CBf0fM/contact.jpg")` }}>
                    <h1 className="text-center text-3xl font-semibold mt-8 text-white py-16">Please type here</h1>

                    <div className="hero lg:w-4/5 w-full mx-auto">
                        <div className="flex flex-col items-start lg:gap-x-40 lg:flex-row-reverse">
                            <form ref={form} onSubmit={handleSendEmail} className="card-body justify-items-center p-0 text-white">
                                <div className="form-control mb-2">
                                    <input name="name" type="text" placeholder="Name" className="input input-bordered lg:w-96 w-full bg-transparent border border-white" required />
                                </div>
                                <div className="form-control mb-2">
                                    <input name="email" type="email" placeholder="Email" className="input input-bordered border-white bg-transparent border" required />
                                </div>
                                <div className="form-control mb-2">
                                    <textarea name="message" className="textarea textarea-bordered border bg-transparent border-white" placeholder="Message" required></textarea>
                                </div>
                                <div className="form-control mt-6 mb-8">
                                    <button type="submit" className="btn border-none bg-[#00b894] text-white">
                                        <FaTelegramPlane className="mr-2" />
                                        <span>Send Query</span>
                                    </button>
                                </div>
                            </form>
                            <div className="flex flex-col pt-4 text-white">
                                <h1 className="text-3xl flex items-center my-3">
                                    <GoMail className="mr-3" />  {/* Replaced with GoMail */}
                                    <span className="text-xl font-medium">help@SerenityHub.com</span>
                                </h1>
                                <h1 className="text-3xl flex items-center my-3">
                                    <BsFillTelephoneForwardFill className="mr-3" />
                                    <span className="text-xl font-medium">+8809638700900</span>
                                </h1>
                                <h1 className="text-3xl flex items-center my-3">
                                    <MdLocationOn className="mr-3" />
                                    <span className="text-xl font-medium">Pallabi, Dhaka, Bangladesh</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;

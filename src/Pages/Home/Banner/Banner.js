import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const slides = [
    {
        image: "//i.postimg.cc/j56x77Fy/Banner-2.jpg",
        text: "আশা হারাবেন না, প্রতিটি দিন নতুন সম্ভাবনার সূচনা।",
        position: { top: "322px", left: "766px" }
    },
    {
        image: "//i.postimg.cc/nrHHYhyg/Banner-5.jpg",
        text: "যখন জীবন কঠিন হয়, তখন সাহসী হওয়া জরুরি।",
        position: { top: "313px", left: "809px" }
    },
    {
        image: "//i.postimg.cc/gk2zxrq6/Banner-8.jpg",
        text: "অন্ধকার শেষে আলো আসবেই, শুধু বিশ্বাস রাখুন।",
        position: { top: "379px", left: "622px" }
    },
    {
        image: "//i.postimg.cc/wjPj8HNR/Banner-1.jpg",
        text: "ছোট ছোট পদক্ষেপই বড় পরিবর্তনের পথে নিয়ে যায়",
        position: { top: "450px", left: "150px" } // Adjusted position for the 4th image
    }
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="relative w-full overflow-hidden"
            style={{ height: isMobile ? '400px' : isTablet ? '600px' : '750px' }} // Adjusted height for desktop view
        >
            {/* Carousel Wrapper */}
            <div className="relative w-full h-full">
                {/* Current Slide */}
                <div className="absolute inset-0 transition-all duration-700">
                    <img
                        src={slides[currentIndex].image}
                        alt={`slide-${currentIndex}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    {/* Overlay Text with Position */}
                    <div
                        className="absolute text-white font-bold p-4 transition-opacity duration-500"
                        style={{
                            top: isMobile ? '320px' : slides[currentIndex].position.top, // Adjusted for mobile
                            left: isMobile ? '10%' : slides[currentIndex].position.left,  // Center the text for mobile
                            fontSize: isMobile ? '18px' : isTablet ? '32px' : '44px',
                            width: isMobile ? '80%' : '459px', // Adjusted width for mobile
                            textAlign: isMobile ? 'center' : 'left' // Centered text for mobile
                        }}
                    >
                        {slides[currentIndex].text}
                    </div>
                </div>

                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg focus:outline-none"
                >
                    &#8249;
                </button>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg focus:outline-none"
                >
                    &#8250;
                </button>
            </div>

            {/* Image Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-4 h-4 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;

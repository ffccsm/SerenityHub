import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const slides = [
    {
        image: "//i.postimg.cc/xjv4cn6M/1-slide-1.jpg",
        text: "বন্ধ ঘরের অন্ধকারে নয় আলোতে এসো, সারা পৃথিবী তোমাকে ডাকছে",
        position: { top: "322px", left: "766px" }
    },
    {
        image: "//i.postimg.cc/zvFtMFy0/1-slide-2.jpg",
        text: "হাত বাড়ালেই জীবনের শুরু",
        position: { top: "313px", left: "809px" }
    },
    {
        image: "//i.postimg.cc/d1dSRYwM/1-slide-3.jpg",
        text: "ভয় নয় ভালোবাসা, গোপনীয়তা নয় চিকিৎসা, মানসিক রোগ নয় সুস্থ জীবন",
        position: { top: "379px", left: "622px" }
    },
    {
        image: "//i.postimg.cc/MHS3dFpn/1-slide-4.jpg",
        text: "আসুন কথা বলি জীবনকে সহজ করে তুলি",
        position: { top: "910px", left: "710px" }
    }
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showText, setShowText] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1024px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

    const nextSlide = () => {
        setShowText(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 100);
    };

    const prevSlide = () => {
        setShowText(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
        }, 100);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const textTimeout = setTimeout(() => {
            setShowText(true);
        }, 1000);
        return () => clearTimeout(textTimeout);
    }, [currentIndex]);

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
                    {/* Overlay Text with Position and Delay */}
                    {showText && (
                        <div
                            className="absolute text-white font-bold p-4 transition-opacity duration-500"
                            style={{
                                top: slides[currentIndex].position.top,
                                left: slides[currentIndex].position.left,
                                fontSize: isMobile ? '24px' : isTablet ? '32px' : '44px',
                                width: isMobile ? '100%' : '459px',
                            }}
                        >
                            {slides[currentIndex].text}
                        </div>
                    )}
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
                        onClick={() => {
                            setShowText(false);
                            setCurrentIndex(index);
                        }}
                        className={`w-4 h-4 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;

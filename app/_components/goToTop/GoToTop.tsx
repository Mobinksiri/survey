import React, { useState, useEffect } from 'react';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to check the scroll position
    const handleScroll = () => {
      // Check if the user has scrolled down by at least 20 pixels
      if (window.scrollY > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Add smooth scrolling animation
    });
  };

  return (
    <div
      className={` hidden  w-10 h-10 bg-gray-100 border border-gray-300 shadow-comment rounded-full hover:bg-gray-200 cursor-pointer transition-all fixed bottom-4 right-4 z-[20] lg:flex items-center justify-center ${
        isVisible
          ? 'opacity-100 pointer-events-auto scale-[1]'
          : 'opacity-0 pointer-events-none scale-[0.5]'
      }`}
      onClick={scrollToTop}
    >
      <i className="fa-solid fa-arrow-up-to-line"></i>
    </div>
  );
};

export default GoToTop;

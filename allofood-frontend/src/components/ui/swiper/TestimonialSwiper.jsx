import React, { useState, useEffect } from 'react';

import ava_01 from '../../../assets/img/ava-1.jpg';
import ava_02 from '../../../assets/img/ava-2.jpg';
import ava_03 from '../../../assets/img/ava-3.jpg';

const testimonials = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magni asperiores deleniti, dolorem incidunt obcaecati quibusdam laborum soluta repellendus quidem voluptate, illo beatae recusandae nobis necessitatibus. Est harum sed nisi?",
    name: "Jhon Doe",
    avatar: ava_01
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magni asperiores deleniti, dolorem incidunt obcaecati quibusdam laborum soluta repellendus quidem voluptate, illo beatae recusandae nobis necessitatibus. Est harum sed nisi?",
    name: "Annabel Jin",
    avatar: ava_02
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita magni asperiores deleniti, dolorem incidunt obcaecati quibusdam laborum soluta repellendus quidem voluptate, illo beatae recusandae nobis necessitatibus. Est harum sed nisi?",
    name: "Sheng piang",
    avatar: ava_03
  }
];

const TestimonialSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl pr-4 py-8">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <p className="text-gray-700 mb-4 text-lg italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.avatar} 
                  alt={`${testimonial.name} avatar`} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h6 className="font-semibold text-lg">{testimonial.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSwiper;
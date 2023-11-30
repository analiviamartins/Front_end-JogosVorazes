'use client'
import React, { useState } from 'react';
import carrosel from './css/carrosel.module.css';

const images = [
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/456730277.jpg',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/404331428.png',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/156070322.jpg',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/725681616.png',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/561471606.jpg',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/326655106.png',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/607537563.png',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/472306920.png',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/312785272.png',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/874248082.png',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/347822808.png',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/404022634.jpg',
  'http://thg-agehotel-oficial.weebly.com/uploads/1/2/8/1/12811829/235648800.png',
];

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImages = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 3) % images.length);
    if (currentImageIndex === 12) {
      setCurrentImageIndex(0);
    }
  };

  const prevImages = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 3 + images.length) % images.length
    );
    if (currentImageIndex === 0) {
      setCurrentImageIndex(12);
    }
  };

  return (
    <>

    <div>
    <h1 className={carrosel.imgDistritos}>Distritos</h1>
    </div>
    
        <div className={carrosel.carousel}>
      
      <button className={carrosel.controlBtn} onClick={prevImages}>
        &lt;
      </button>
      <div className={carrosel.carousel-images}>
        {images.slice(currentImageIndex, currentImageIndex + 3).map((image, index) => (
          <img
            key={index}
            className={carrosel.carousel-image}
            src={image}
            alt={`carousel-${currentImageIndex + index}`}
          />
        ))}
      </div>
      <button className={carrosel.controlBtn} onClick={nextImages}>
        &gt;
      </button>
    </div>
    
    
    </>


  );
};

export default Carousel;
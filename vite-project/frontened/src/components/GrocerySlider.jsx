import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './GrocerySlider.css'; // Custom CSS for styling

const GrocerySlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const slides = [
    {
      slogan: "Fresh and Organic",
      image: "./images/apple.png" // Replace with your image paths
    },
    {
      slogan: "Healthy and Nutritious",
      image: "./images/apple.png"
    },
    {
      slogan: "Quality you can trust",
      image: "./images/apple.png"
    }
  ];

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="slide">
          <div className="slogan">
            <h2>{slide.slogan}</h2>
          </div>
          <div className="image">
            <img src={slide.image} alt={slide.slogan} />
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default GrocerySlider;

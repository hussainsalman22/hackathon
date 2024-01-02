import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="bg-gray-100">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our ADMINPANEL</h1>
        <Slider {...sliderSettings}>
          <div>
            <img className="w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0cD6xP1j4_CB65tw8aIUCcr4xNgJgRNsvb9hQrUACw&s" alt="Slider 1" />
          </div>
          <div>
            <img className="w-50" src="https://media.licdn.com/dms/image/C5612AQHbYXLzpLwkXg/article-cover_image-shrink_600_2000/0/1520217746301?e=2147483647&v=beta&t=30r-ms2dWFly-HedmGh2lDGdvrpVxrX9R2IZayXOhZY" alt="Slider 2" />
          </div>
          {/* Add more slides as needed */}
        </Slider>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Administrator</h2>
          {/* Content for administrator section */}
          {/* You can add content related to administrator here */}
        </div>
      </div>
    </div>
  );
};

export default Home;

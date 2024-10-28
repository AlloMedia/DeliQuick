import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick"; 

const DetailRestaurant = () => {
  const { restaurantId } = useParams(); 
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/superadmin/restaurants/${restaurantId}`);
        setRestaurant(response.data.restaurant);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  if (!restaurant) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <section className="ezy__epprofile5 light py-14 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden flex items-center justify-center">
      <div className="container ml-64 flex flex-col items-center">
        <div className="grid grid-cols-12 gap-6">

          {/* content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-xl p-4 md:p-6">
              <div className="relative mb-[150px] rounded-xl">
                <img
                  src={`http://localhost:3001${restaurant.images?.banner}`} 
                  alt={restaurant.name}
                  className="w-full h-[350px] rounded-xl object-cover"
                />
                <img
                  src={`http://localhost:3001${restaurant.images?.profileImage}`}
                  alt={restaurant.name}
                  className="absolute -bottom-24 left-1/2 -translate-x-1/2 rounded-full w-52 h-52 object-cover"
                />
              </div>

              <div className="lg:px-12">
                  <h1 className="text-3xl md:text-[40px] font-bold leading-tight text-center">{restaurant.name}</h1>
                  <div className="grid grid-cols-2 gap-6 justify-between mt-6 md:mt-12">
                    <div className="col-span-1 flex flex-col">
                      <p className="uppercase text-gray-800 mb-2 font-bold">Description:</p>
                      <p className="text-black">{restaurant.description}</p> 
                    </div>
                    <div className="col-span-1 flex flex-col">
                      <p className="uppercase text-gray-800 mb-2 font-bold">Address:</p>
                      <p className="text-black">{restaurant.address}</p> 
                    </div>
                    <div className="col-span-1 flex flex-col">
                      <p className="uppercase text-gray-800 mb-2 font-bold">Phone:</p>
                      <p className="text-black">{restaurant.phone}</p> 
                    </div>
                    <div className="col-span-1 flex flex-col">
                      <p className="uppercase text-gray-800 mb-2 font-bold">Status:</p>
                      <p className="text-black">{restaurant.status}</p> 
                    </div>
                  </div>
                </div>

              <div className="my-12 lg:px-12">
                <h6 className="text-3xl font-bold mb-6">About Us</h6>
              {/* Section des slides */}
              <div className="my-6 lg:px-12">
              <Slider {...settings}>
                  {restaurant.images?.slides.map((image, index) => (
                    <div key={index}>
                      <img 
                        src={`http://localhost:3001${image}`} 
                        alt={`Slide ${index + 1}`} 
                        className="w-full h-auto rounded-lg" 
                      />
                    </div>
                  ))}
                </Slider>
              </div>

                <p className="text-justify opacity-75">
                  {restaurant.menuDescription || "Explore our menu for delicious options!"}
                  <br /><br />
                  Join us for an unforgettable dining experience in a warm and inviting atmosphere. Our dedicated staff is here to ensure that every moment spent with us is delightful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailRestaurant;

import React from "react";
import heroImg from "../assets/images/hero.png";
import Category from "../components/ui/category/Category";
import Feature from "../components/ui/feature/Feature";
import ProductCard from "../components/ui/product-card/ProductCard";

import foodCategory01 from "../assets/images/hamburger.png";
import foodCategory02 from "../assets/images/pizza.png";
import foodCategory03 from "../assets/images/bread.png";
import whyImage from "../assets/images/location.png";
import testimonialImg from "../assets/images/network.png";

import { useState } from "react";
import products from "../assets/facke-data/product";
import TestimonialSwiper from "../components/ui/swiper/TestimonialSwiper";
// src/views/index.jsx
import ApprovedRestaurantsSection from '../components/restaurants/index';


const Index = () => {
  const [category, setCategory] = useState("All");
  const filteredProducts = products.filter(
    (item) => item.category === category
  );
  const pizzaProducts = products
    .filter((item) => item.category === "Pizza")
    .slice(0, 4);

  function checkCategory() {
    if (category === "All") {
      return products;
    } else {
      return filteredProducts;
    }
  }

  function handleCategory(arg) {
    setCategory(arg);
  }

  return (
    <>
      <main className="w-[85%] mx-auto flex items-center justify-between mt-6">
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4">
            Easy way to make an order
          </h2>
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-[#DF2020]">HUNGRY?</span> Just wait food at
            your door.
          </h1>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            dolor.
          </p>
          <div className="flex space-x-4">
            <button className="bg-[#DF2020] text-white px-6 py-2 rounded-lg">
              Order Now &gt;
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg">
              See all foods
            </button>
          </div>
          <div className="flex items-center space-x-8 mt-8">
            <div className="flex items-center">
              <span className="bg-[#DF2020] p-2 rounded-lg mr-2">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="text-sm">No Shopping Charge</span>
            </div>
            <div className="flex items-center">
              <span className="bg-[#DF2020] p-2 rounded-lg mr-2">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="text-sm">100% secure checkout</span>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img
            src={heroImg}
            alt="Food Delivery Illustration"
            className="w-full"
          />
        </div>
      </main>

      <section className="w-[85%] mx-auto mt-24">
        <Category />
      </section>

      <section className="w-[85%] mx-auto mt-24">
        <h5 className="text-3xl font-bold text-[#DF2020] text-center mb-3">
          What we serve
        </h5>
        <h2 className="text-3xl font-semibold text-center mb-3">
          Just sit back at home
        </h2>
        <h2 className="text-2xl font-semibold text-center mb-8">
          We will <span className="text-[#DF2020]">take care of</span>
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum,
          similique.
          <br />
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum,
          similique.
        </p>

        <Feature />
      </section>


      <ApprovedRestaurantsSection />


      <section className="w-[85%] mx-auto mt-24">
        <h2 className="text-3xl text-center font-bold mb-8">Popular Foods</h2>
        <div className="bg-[#DF2020] py-5 mb-8 flex justify-center items-center space-x-8 rounded-lg">
          <button
            className={` ${category === "All" ? "bg-white text-[#DF2020]" : "text-white"} px-5 py-2 rounded-lg h-fit`}
            onClick={() => handleCategory("All")}
          >
            All
          </button>
          <button
            className={`${category === "Burger" ? "bg-white text-[#DF2020]" : "text-white"} flex items-center gap-3 px-5 py-2 rounded-md`}
            onClick={() => handleCategory("Burger")}
          >
            <img
              src={foodCategory01}
              className="w-[2.18rem]"
              alt="foodcategory-image"
            />
            <span>Burger</span>
          </button>
          <button
            className={`${category === "Pizza" ? "bg-white text-[#DF2020]" : "text-white"} flex items-center gap-3 px-5 py-2 rounded-md`}
            onClick={() => handleCategory("Pizza")}
          >
            <img
              src={foodCategory02}
              className="w-[2.18rem]"
              alt="foodcategory-image"
            />
            <span>Pizza</span>
          </button>
          <button
            className={`${category === "Bread" ? "bg-white text-[#DF2020]" : "text-white"} flex items-center gap-3 px-5 py-2 rounded-md`}
            onClick={() => handleCategory("Bread")}
          >
            <img
              src={foodCategory03}
              className="w-[2.18rem]"
              alt="foodcategory-image"
            />
            <span>Bread</span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {checkCategory().map((product) => {
            return (
              <div className="mt-5" key={product.id}>
                <ProductCard {...product} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="w-[85%] mx-auto mt-24 flex items-center">
        <div className="w-1/2">
          <img src={whyImage} alt="Why Tasty Treat" className="w-full" />
        </div>
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4">Why Tasty Treat?</h2>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            iure pariatur, temporibus, quibusdam dignissimos ab facere a in sed
            sapiente praesentium neque rem aspernatur error odit est labore
            veniam ratione!
          </p>
          <ul>
            <li className="mb-8">
              <div className="flex items-center mb-2">
                <span className="bg-[#DF2020] p-1 rounded-lg mr-2">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <h3 className="font-semibold">Fresh and tasty foods</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Facere, voluptate.
              </p>
            </li>

            <li className="mb-8">
              <div className="flex items-center mb-2">
                <span className="bg-[#DF2020] p-1 rounded-lg mr-2">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <h3 className="font-semibold">Quality support</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Facere, voluptate.
              </p>
            </li>

            <li className="mb-8">
              <div className="flex items-center mb-2">
                <span className="bg-[#DF2020] p-1 rounded-lg mr-2">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <h3 className="font-semibold">Order from any location</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Facere, voluptate.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="w-[85%] mx-auto mt-16">
        <h2 className="text-center text-4xl font-bold mb-14">Hot Pizza</h2>
        <div className="grid grid-cols-4 gap-8">
          {pizzaProducts.map((pizza) => (
            <div className="mb-2" key={pizza.id}>
              <ProductCard {...pizza} />
            </div>
          ))}
        </div>
      </section>

      <section className="w-[85%] mx-auto mt-24">
        <div className="flex md:flex-row flex-col">
          <div className="testimonial-content w-full md:w-1/2">
            <h5 className="testimonial-header text-xl font-bold mb-4">
              Testimonial
            </h5>
            <h2 className="text-2xl font-semibold mb-6">
              What our <span className="text-[#DF2020]">Customers</span> are
              saying
            </h2>
            <p className="text-gray-600 mb-3">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis
              pharetra adipiscing ultrices vulputate posuere tristique. In sed
              odio nec aliquet eu proin mauris et."
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <img src={testimonialImg} alt="Testimonial" className="w-full" />
          </div>
        </div>
        <div className="mt-10 mb-16">
          <TestimonialSwiper />
        </div>
      </section>
    </>
  );
};

export default Index;

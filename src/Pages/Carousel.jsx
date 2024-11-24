import React from "react";
import Slider from "react-slick";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "Amit Sharma",
      location: "Mumbai, India",
      text: "This is the best pet care service I have ever used! The response was quick, and my pet felt much better after the consultation. Highly recommended!",
    },
    {
      name: "Priya Rao",
      location: "Bengaluru, India",
      text: "The convenience of getting in touch with a vet from home is unbeatable. The medications suggested worked wonders for my dog.",
    },
    {
      name: "Rajeev Verma",
      location: "Delhi, India",
      text: "I was initially skeptical about online vet consultations, but after using Furry Friend, I’m completely convinced. Great service and caring professionals!",
    },
    {
      name: "Neha Desai",
      location: "Chennai, India",
      text: "Furry Friend made it so easy to get the right treatment for my pet. The medication arrived on time, and my cat is doing much better now!",
    },
    {
      name: "Karthik Iyer",
      location: "Hyderabad, India",
      text: "Amazing service. The vet was very helpful and guided me well. My pet’s health is in great hands with Furry Friend.",
    },
  ];

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
    <div className="w-full px-4 py-8 md:px-40">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-black">
            <p className="italic text-lg mb-4">{`"${testimonial.text}"`}</p>
            <p className="font-semibold text-xl">{testimonial.name}</p>
            <p className="text-gray-500">{testimonial.location}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;

import React from 'react';
import './Features.css';

export const benefits = [
  {
    id: "0",
    title: "Ask anything",
    text: "Find quick answers and recommendations for city-specific queries. CityBot helps you navigate urban adventures effortlessly.",
  },
  {
    id: "1",
    title: "Connect everywhere",
    text: "Stay connected to your city from any device. CityBot makes accessing local recommendations and information easy and convenient.",
  },
  {
    id: "2",
    title: "Fast responding",
    text: "Get rapid updates on local events and activities. CityBot ensures you stay informed and engaged with your city.",
  },
];

const Benefits = () => {
  return (
    <section className="benefits-section" id="features">
      <div className="benefits-header">
        <h2>Find hidden gems and popular spots with ease.</h2>
      </div>
      <div className="benefits-container">
        {benefits.map((item) => (
          <div className="benefit-card" key={item.id}>
            <h3 className="benefit-title">{item.title}</h3>
            <p className="benefit-text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;

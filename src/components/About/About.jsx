import React from 'react';
import './About.css'; // Create this CSS file with the styles below
import grid from '../../assets/grid.png'; // Adjust paths as needed
import check2 from '../../assets/check-02.svg'; // Adjust paths as needed
import loading1 from '../../assets/loading-01.svg'; // Adjust paths as needed
import roadmap2 from '../../assets/roadmap/image-2.png';
import roadmap3 from "../../assets/roadmap/image-3.png";
import roadmap4 from "../../assets/roadmap/image-5.jpg"


export const roadmap = [
    {
      id: "0",
      title: "NLP integration",
      text: "Enhance the chatbot with Natural Language Processing (NLP) to understand and respond more intelligently to user queries.",
      status: "progress",
      imageUrl: roadmap4, // Use the correct image for this section
    },
    {
      id: "2",
      title: "Chatbot customization",
      text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
      status: "progress",
      imageUrl: roadmap3,
    },
    {
      id: "3",
      title: "Gamification",
      text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
      status: "progress",
      imageUrl: roadmap2,
    },
  ];
  

const Roadmap = () => (
  <section className="roadmap-section" id="about">
    <div className="container">
      <h2 className="heading">What we’re working on</h2>

      <div className="roadmap-grid">
        {roadmap.map((item) => {
          const status = item.status === 'done' ? 'Done' : 'In progress';

          return (
            <div
              className={`roadmap-item ${item.colorful ? 'colorful' : ''}`}
              key={item.id}
            >
              <div className="roadmap-content">
                <div className="roadmap-header">
                  <span className="roadmap-date">{item.date}</span>

                  <div className="status-badge">
                    <img
                      className="status-icon"
                      src={item.status === 'done' ? check2 : loading1}
                      alt={status}
                    />
                    <span className="status-text">{status}</span>
                  </div>
                </div>

                <div className="roadmap-image-wrapper">
                  <img
                    className="roadmap-image"
                    src={item.imageUrl}
                    alt={item.title}
                  />
                </div>
                <h4 className="roadmap-title">{item.title}</h4>
                <p className="roadmap-text">{item.text}</p>
              </div>
              <div className="grid-overlay">
                <img
                  className="grid-image"
                  src={grid}
                  alt="Grid"
                />
              </div>
            </div>
          );
        })}
        <div className="gradient-overlay"></div>
      </div>

     
    </div>
  </section>
);

export default Roadmap;

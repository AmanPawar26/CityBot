import React from 'react';
import './Footer.css'; // Ensure you have the corresponding CSS file
import discordBlack from "../../assets/socials/discord.svg";
import twitter from "../../assets/socials/twitter.svg";
import instagram from "../../assets/socials/instagram.svg";
import telegram from "../../assets/socials/telegram.svg";
import facebook from "../../assets/socials/facebook.svg";

const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-caption">
          © {new Date().getFullYear()}. All rights reserved.
        </p>

        <ul className="socials-list">
          {socials.map((item) => (
            <li key={item.id} className="social-item">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <img
                  src={item.iconUrl}
                  width={16}
                  height={16}
                  alt={item.title}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;


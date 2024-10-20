import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import Weather from '../Weather/Weather'
import { FaBell, FaHome, FaSignOutAlt, FaComment, FaCog, FaUser, FaBolt, FaMap, FaCalendar, FaSearch, FaEdit, FaLock, FaPaperPlane } from 'react-icons/fa';

function FuturisticCityBotDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to CityBot. How can I assist you today?", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const chatWindowRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
    setDropdownOpen(false);
  };

  const confirmLogout = () => {
    // Perform logout actions here
    window.location.href = './'; // Ensure this path is correct
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };


  const arrayOfPossibleMessage = [
    { message: "hi", response: "Hello! How can I assist you today?" },

    // Restaurants
    { message: "show me restaurants in", key: "restaurants", response: "Here are some restaurants in {city}: {data}" },
    { message: "suggest some restaurants in", key: "restaurants", response: "Here are some of the best restaurants in {locality}: {data}" },
    { message: "find restaurants having", key: "restaurants", response: "Here are some restaurants offering {cuisine} cuisine: {data}" },

    // Concerts
    { message: "suggest me concerts with genre", key: "concerts", response: "Here are some concerts with the genre {genre}: {data}" },
    { message: "show me concerts in", key: "concerts", response: "Here are some concerts in {venue}: {data}" },
    { message: "find concerts featuring", key: "concerts", response: "Here are some concerts featuring {artistName}: {data}" },
    { message: "suggest me concerts in", key: "concerts", response: "Here are some concerts in language {language}: {data}" },

    // Exhibitions
    { message: "find exhibitions with event type", key: "exhibitions", response: "Here are some exhibitions with the event type {eventType}: {data}" },
    { message: "show me exhibitions with theme", key: "exhibitions", response: "Here are some exhibitions with the theme {theme}: {data}" },
    { message: "suggest exhibitions at", key: "exhibitions", response: "Here are some exhibitions at {venue}: {data}" },
    { message: "find exhibitions featuring", key: "exhibitions", response: "Here are some exhibitions featuring {exhibitors}: {data}" },

    // Theatre Plays
    { message: "find theatre plays by playwright", key: "theatreplays", response: "Here are some theatre plays by {playwright}: {data}" },
    { message: "show me theatre plays directed by", key: "theatreplays", response: "Here are some theatre plays directed by {director}: {data}" },
    { message: "suggest theatre plays in language", key: "theatreplays", response: "Here are some theatre plays in {language}: {data}" },
    { message: "find theatre plays of genre", key: "theatreplays", response: "Here are some theatre plays in the genre {genre}: {data}" },
    { message: "show me theatre plays featuring", key: "theatreplays", response: "Here are some theatre plays featuring {cast}: {data}" },
    { message: "find theatre plays at", key: "theatreplays", response: "Here are some theatre plays at {venue}: {data}" },


    // Things to Do
    { message: "what can I do in", key: "thingstodo", response: "Here are some activities you can do in {location}: {data}" },
    { message: "find activities by category", key: "thingstodo", response: "Here are some activities in the category {category}: {data}" },
    { message: "show me accessible activities", key: "thingstodo", response: "Here are some activities with {accessibility} accessibility: {data}" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      sendMessage(inputMessage);
      chatbotResponse(inputMessage);
      setInputMessage("");
    }
  };

  const sendMessage = (userMessage) => {
    setMessages(prevMessages => [...prevMessages, { id: prevMessages.length + 1, text: userMessage, sender: "user" }]);
  };

  const chatbotResponse = (userMessage) => {
    const messageObject = arrayOfPossibleMessage.find(val => {
      const regex = new RegExp(`\\b${val.message}\\b`, 'i');
      return regex.test(userMessage.toLowerCase());
    });

    if (messageObject) {
      const params = {};
      let response = messageObject.response;
      setIsTyping(true); // Set typing status

      if (messageObject.key === 'restaurants') {
        // Restaurant handling logic
        if (messageObject.response.includes('{city}')) {
          const cityMatch = userMessage.match(/in\s([\w\s]+)(?=\s|$)/i);
          if (cityMatch) {
            params.city = cityMatch[1].trim();
          }
        }

        if (messageObject.response.includes('{cuisine}')) {
          const cuisineMatch = userMessage.match(/having\s([\w\s]+)\scuisine/i);
          if (cuisineMatch) {
            params.cuisine = cuisineMatch[1].trim();
          }
        }

        if (messageObject.response.includes('{locality}')) {
          const localityMatch = userMessage.match(/in\s([\w\s]+)(?=\s|$)/i);
          if (localityMatch) {
            params.locality = localityMatch[1].trim();
          }
        }

        fetchBackendData(messageObject.key, params)
          .then(data => {
            if (data.length === 0) {
              response = `Sorry, I couldn't find any matching ${messageObject.key} for your request.`;
            } else {
              let restaurantData = '<br/><ol>';
              data.forEach(dataValue => {
                restaurantData += `<li>Name: ${dataValue.Name}</li>`;
              });
              restaurantData += '</ol>';
              response = response.replace("{data}", restaurantData);
              response = response.replace("{city}", params.city || "");
              response = response.replace("{locality}", params.locality || "");
              response = response.replace("{cuisine}", params.cuisine || "");
            }
            setTimeout(() => {
              addBotResponse(response);
              setIsTyping(false); // Reset typing status
            }, 1000 + Math.random() * 1000); // 1-2 seconds delay
          })
          .catch(error => {
            console.error("Error fetching data:", error);
            setTimeout(() => {
              addBotResponse("Sorry, there was an error fetching the data.");
              setIsTyping(false);
            }, 1000 + Math.random() * 1000);
          });
      }

      // Concert handling logic
      else if (messageObject.key === 'concerts') {
        if (messageObject.response.includes('{genre}')) {
          const genreMatch = userMessage.match(/with\sgenre\s([\w\s]+)(?=\s|$)/i);
          if (genreMatch) {
            params.genre = genreMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{language}')) {
          const languageMatch = userMessage.match(/in\s([\w\s]+)\slanguage/i);
          if (languageMatch) {
            params.language = languageMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{artistName}')) {
          const artistMatch = userMessage.match(/featuring\s([\w\s]+)(?=\s|$)/i);
          if (artistMatch) {
            params.artistName = artistMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{venue}')) {
          const venueMatch = userMessage.match(/in\s([\w\s]+)(?=\s|$)/i);
          if (venueMatch) {
            params.venue = venueMatch[1].trim();
          }
        }

        fetchBackendData(messageObject.key, params)
          .then(data => {
            if (data.length === 0) {
              response = `Sorry, I couldn't find any matching ${messageObject.key} for your request.`;
            } else {
              let concertData = '<br/><ol>';
              data.forEach(dataValue => {
                concertData += `<li>Concert Name: ${dataValue.ConcertName}</li>`;
              });
              concertData += '</ol>';
              response = response.replace("{data}", concertData);
              response = response.replace("{genre}", params.genre || "");
              response = response.replace("{language}", params.language || "");
              response = response.replace("{artistName}", params.artistName || "");
              response = response.replace("{venue}", params.venue || "");
            }
            setTimeout(() => {
              addBotResponse(response);
              setIsTyping(false); // Reset typing status
            }, 1000 + Math.random() * 1000);
          })
          .catch(error => {
            console.error("Error fetching data:", error);
            setTimeout(() => {
              addBotResponse("Sorry, there was an error fetching the data.");
              setIsTyping(false);
            }, 1000 + Math.random() * 1000);
          });
      }

      // Exhibition handling logic
      else if (messageObject.key === 'exhibitions') {
        if (messageObject.response.includes('{eventType}')) {
          const eventTypeMatch = userMessage.match(/event\stype\s([\w\s]+)(?=\s|$)/i);
          if (eventTypeMatch) {
            params.eventType = eventTypeMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{theme}')) {
          const themeMatch = userMessage.match(/theme\s([\w\s]+)(?=\s|$)/i);
          if (themeMatch) {
            params.theme = themeMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{venue}')) {
          const venueMatch = userMessage.match(/at\s([\w\s]+)(?=\s|$)/i);
          if (venueMatch) {
            params.venue = venueMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{exhibitors}')) {
          const exhibitorsMatch = userMessage.match(/featuring\s([\w\s]+)(?=\s|$)/i);
          if (exhibitorsMatch) {
            params.exhibitors = exhibitorsMatch[1].trim();
          }
        }

        fetchBackendData(messageObject.key, params)
          .then(data => {
            if (data.length === 0) {
              response = `Sorry, I couldn't find any matching ${messageObject.key} for your request.`;
            } else {
              let exhibitionData = '<br/><ol>';
              data.forEach(dataValue => {
                exhibitionData += `<li>Event Name: ${dataValue.EventName}</li>`;
              });
              exhibitionData += '</ol>';
              response = response.replace("{data}", exhibitionData);
              response = response.replace("{eventType}", params.eventType || "");
              response = response.replace("{theme}", params.theme || "");
              response = response.replace("{venue}", params.venue || "");
              response = response.replace("{exhibitors}", params.exhibitors || "");
            }
            setTimeout(() => {
              addBotResponse(response);
              setIsTyping(false); // Reset typing status
            }, 1000 + Math.random() * 1000);
          })

          .catch(error => {
            console.error("Error fetching data:", error);
            setTimeout(() => {
              addBotResponse("Sorry, there was an error fetching the data.");
              setIsTyping(false);
            }, 1000 + Math.random() * 1000);
          });
      }

      // Theatre Play handling logic
      else if (messageObject.key === 'theatreplays') {
        if (messageObject.response.includes('{playwright}')) {
          const playwrightMatch = userMessage.match(/by\s+(?:playwright\s+)?([\w\s'.-]+)(?=\s|$)/i);
          if (playwrightMatch) {
            params.playwright = playwrightMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{director}')) {
          const directorMatch = userMessage.match(/directed\sby\s([\w\s]+)(?=\s|$)/i);
          if (directorMatch) {
            params.director = directorMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{language}')) {
          const languageMatch = userMessage.match(/in\s+(?:language\s+)?([\w\s' .-]+)(?=\s|$)/i);
          if (languageMatch) {
            params.language = languageMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{genre}')) {
          const genreMatch = userMessage.match(/of\sgenre\s([\w\s]+)(?=\s|$)/i);
          if (genreMatch) {
            params.genre = genreMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{cast}')) {
          const castMatch = userMessage.match(/featuring\s([\w\s]+)(?=\s|$)/i);
          if (castMatch) {
            params.cast = castMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{venue}')) {
          const venueMatch = userMessage.match(/at\s([\w\s]+)(?=\s|$)/i);
          if (venueMatch) {
            params.venue = venueMatch[1].trim();
          }
        }

        // Fetch data from the backend
        fetchBackendData(messageObject.key, params)
          .then(data => {
            let response = messageObject.response;

            if (data.length === 0) {
              response = `Sorry, I couldn't find any matching theatre plays for your request.`;
            } else {
              let playData = '<br/><ol>';
              data.forEach(dataValue => {
                playData += `<li>Theatre Play: ${dataValue.Title}</li>`;
              });
              playData += '</ol>';
              response = response.replace("{data}", playData);
              response = response.replace("{playwright}", params.playwright || "");
              response = response.replace("{director}", params.director || "");
              response = response.replace("{language}", params.language || "");
              response = response.replace("{genre}", params.genre || "");
              response = response.replace("{cast}", params.cast || "");
              response = response.replace("{venue}", params.venue || "");
            }

            setTimeout(() => {
              addBotResponse(response);
              setIsTyping(false); // Reset typing status
            }, 1000 + Math.random() * 1000); // 1-2 seconds delay
          })
          .catch(error => {
            console.error("Error fetching data:", error);
            setTimeout(() => {
              addBotResponse("Sorry, there was an error fetching the data.");
              setIsTyping(false);
            }, 1000 + Math.random() * 1000);
          });
      }

      // Things to Do handling logic
      else if (messageObject.key === 'thingstodo') {
        if (messageObject.response.includes('{category}')) {
          const categoryMatch = userMessage.match(/by\scategory\s([\w\s]+)(?=\s|$)/i);
          if (categoryMatch) {
            params.category = categoryMatch[1].trim();
          }
        }
        if (messageObject.response.includes('{location}')) {
          const locationMatch = userMessage.match(/in\s([\w\s]+)(?=\s|$)/i);
          if (locationMatch) {
            params.location = locationMatch[1].trim();
          }
        }

        fetchBackendData(messageObject.key, params)
          .then(data => {
            if (data.length === 0) {
              response = `Sorry, I couldn't find any matching ${messageObject.key} for your request.`;
            } else {
              let todoData = '<br/><ol>';
              data.forEach(dataValue => {
                todoData += `<li>Activity Name: ${dataValue.ActivityName}</li>`;
              });
              todoData += '</ol>';
              response = response.replace("{data}", todoData);
              response = response.replace("{category}", params.category || "");
              response = response.replace("{location}", params.location || "");
            }
            setTimeout(() => {
              addBotResponse(response);
              setIsTyping(false); // Reset typing status
            }, 1000 + Math.random() * 1000);
          })
          .catch(error => {
            console.error("Error fetching data:", error);
            setTimeout(() => {
              addBotResponse("Sorry, there was an error fetching the data.");
              setIsTyping(false);
            }, 1000 + Math.random() * 1000);
          });
      }

      // Handle other message types here
      else {
        setTimeout(() => {
          addBotResponse("Sorry, I didn't understand your request.");
          setIsTyping(false); // Reset typing status
        }, 1000 + Math.random() * 1000);
      }
    } else {
      addBotResponse("I didn't understand that. Please try another message.");
    }
  };



  const addBotResponse = (response) => {
    setMessages(prevMessages => [...prevMessages, { id: prevMessages.length + 1, text: response, sender: "bot" }]);
  };

  const fetchBackendData = (key, params = {}) => {
    const baseUrl = 'http://localhost:3000';
    const url = new URL(`${baseUrl}/${key}`);

    Object.keys(params).forEach(param => url.searchParams.append(param, params[param]));

    console.log('Fetching data from:', url.toString());
    return fetch(url.toString())
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received from backend:', data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
      });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="dashboard-container">
            <div className="dashboard-item">
              <div className="dashboard-header">
                <div className="dashboard-title">City Pulse</div>
              </div>
              <div className="dashboard-content">
              <Weather />
              </div>
            </div>
            <div className="dashboard-item">
              <div className="dashboard-header">
                <div className="dashboard-title">Popular Spots</div>
              </div>
              <div className="dashboard-content">
                <p className="dashboard-value">Neon District</p>
                <p className="dashboard-description">Trending location</p>
              </div>
            </div>
            <div className="dashboard-item">
              <div className="dashboard-header">
                <div className="dashboard-title">Upcoming Event</div>
              </div>
              <div className="dashboard-content">
              <p className="dashboard-value">Tech Expo 2023</p>
              <p className="dashboard-description">In 3 days</p>
              </div>
            </div>
          </div>
        );
      case "chat":
        return (
          <div className="chat-container">
            <div className="chat-content">
              <div className="chat-scroll-area" ref={chatWindowRef}>
                {messages && messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`chat-message ${message.sender}`}
                    >
                      <div className="chat-message-content" dangerouslySetInnerHTML={{ __html: message.text }}></div>
                      {message.timestamp && (
                        <div className="chat-message-time">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="chat-no-messages">No messages yet. Start a conversation!</div>
                )}
                {isTyping && (
                  <div className="chat-message bot">
                    <div className="chat-message-content typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSendMessage} className="chat-form">
                <input
                  type="text"
                  placeholder="Ask CityBot..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="chat-input"
                />
                <button type="submit" className="chat-button">
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </div>
        );
      case "explore":
        return (
          <div className="explore-card">
            <div className="card-header">
              <div className="explore-title">Explore City</div>
              <p className="card-description">Discover the hidden gems of our futuristic metropolis</p>
            </div>
            <div className="explore-content">
              <button className="button outline">
                <FaSearch />
                <div className='explore-search'>
                  <h3 className="text-lg">Find Attractions</h3>
                  <p className="card-description">Locate popular spots and hidden gems</p>
                </div>
              </button>
              <button className="button outline">
                <FaMap />
                <div>
                  <h3 className="text-lg font-semibold">Interactive Map</h3>
                  <p className="card-description">Navigate through our 3D city model</p>
                </div>
              </button>
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="events-container">
            <div className="events-header">
              <div className="events-title">Upcoming Events</div>
              <p className="events-description">Stay updated with the latest happenings in the city</p>
            </div>
            <div className="events-content">
              <ul>
                <li>
                  <div className="events-item-details">
                    <h3>Tech Expo 2023</h3>
                    <p>Showcasing cutting-edge innovations</p>
                  </div>
                  <div className="events-button-container">
                    <button className="events-button">RSVP</button>
                  </div>
                </li>
                <li>
                  <div className="events-item-details">
                    <h3>Neon Nights Festival</h3>
                    <p>Annual celebration of lights and music</p>
                  </div>
                  <div className="events-button-container">
                    <button className="events-button">RSVP</button>
                  </div>
                </li>
                <li>
                  <div className="events-item-details">
                    <h3>AI Art Exhibition</h3>
                    <p>Exploring the intersection of technology and creativity</p>
                  </div>
                  <div className="events-button-container">
                    <button className="events-button">RSVP</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-title">User Profile</div>
              <p className="profile-description">Manage your personal information and preferences</p>
            </div>
            <div className="profile-content">
              <div className="profile-user-info">
                <div className="profile-avatar">
                <FaUser size={80} color="gray" />
                  <img src="/placeholder.svg?height=80&width=80" alt="User" />
                </div>
                <div>
                  <h2 className="profile-name">Aman Pawar</h2>
                  <FaEdit size={20} color="green" />
                  <p className="profile-role">Cyber Explorer</p>
                </div>
              </div>
              <div className="profile-form">
                <div className="profile-form-group">
                  <label className="profile-label">Email</label>
                  <input value="aman.pawar@example.com" readOnly className="profile-input" />
                </div>
                <div className="profile-form-group">
                  <label className="profile-label">Interests</label>
                  <input value="Technology, Art, Cuisine" className="profile-input" />
                </div>
                <button className="profile-button">
                  <FaEdit />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="settings-container">
            <div className="settings-header">
              <div className="settings-title">Settings</div>
              <p className="settings-description">Customize your CityBot experience</p>
            </div>
            <div className="settings-content">
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3>Notifications</h3>
                  <p>Receive alerts for new events and messages</p>
                </div>
                <button className="settings-button">Configure</button>
              </div>
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3>Privacy</h3>
                  <p>Manage your data and visibility settings</p>
                </div>
                <button className="settings-button">Manage</button>
              </div>
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3>Language</h3>
                  <p>Set your preferred language for CityBot</p>
                </div>
                <button className="settings-button">Change</button>
              </div>
              <button className="settings-save-button">
                <FaLock />
                Save Settings
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="logo">
          <FaBolt className="text-purple-400" size={32} />
          <span className="logo-text">CityBot</span>
        </div>
        <nav className="space-y-2">
          <button className={`nav-button ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
            <FaHome size={20} />
            Dashboard
          </button>
          <button className={`nav-button ${activeTab === "chat" ? "active" : ""}`} onClick={() => setActiveTab("chat")}>
            <FaComment size={20} />
            Chat
          </button>
          <button className={`nav-button ${activeTab === "explore" ? "active" : ""}`} onClick={() => setActiveTab("explore")}>
            <FaMap size={20} />
            Explore City
          </button>
          <button className={`nav-button ${activeTab === "events" ? "active" : ""}`} onClick={() => setActiveTab("events")}>
            <FaCalendar size={20} />
            Events
          </button>
          <button className={`nav-button ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
            <FaUser size={20} />
            Profile
          </button>
          <button className={`nav-button ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>
            <FaCog size={20} />
            Settings
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="header">
          <h1 className="header-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="user-menu">
            <div className="text-purple-400 font-bold">
              {currentTime.toLocaleTimeString()}
            </div>
            <button className="button ghost">
              <FaBell size={20} />
            </button>
            <div className="dropdown" ref={dropdownRef}>
              <button className="button ghost" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="avatar">
                  <FaUser size={27} color="gray" />
                  <img src="/placeholder.svg?height=32&width=32" alt="User" />
                </div>
              </button>
              <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                <div className="dropdown-item">Profile</div>
                <div className="dropdown-item">Settings</div>
                <div className="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  <FaSignOutAlt size={16} />
                  <span>Log out</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="content-area">
          {renderContent()}
        </div>
      </div>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button className="modal-button cancel" onClick={cancelLogout}>Cancel</button>
              <button className="modal-button confirm" onClick={confirmLogout}>Yes, Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FuturisticCityBotDashboard;
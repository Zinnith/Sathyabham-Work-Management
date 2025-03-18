//import React from 'react';
import './Dash.css';
import Logo from './Bama.png';
import { useEffect, useState } from 'react';
import Loginpage from './Loginpage';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineEdit, AiOutlineCheck, AiOutlineSetting } from "react-icons/ai";
import { Folder, Upload, Share, Download, Trash, Menu, User,Bell } from "lucide-react";
import Image1 from './assets/Nav2.png';
import Image2 from './assets/Sat1.jpg';
import Image3 from './assets/Sat3.jpg';
import Image4 from './assets/Sat4.jpg';
import Image5 from './assets/Sat2.jpg';
import Ticket from "./assets/ticket.png";
const images = [Image1, Image2, Image3,Image4,Image5];
const folders = [
  { name: "BLOCK 1", items: 48 },
  { name: "HP BILL", items: 156 },
  { name: "BENQ BILL", items: 23 },
  { name: "HEAD OF DEPARTMENT", items: 12 },
  { name: "Personal", items: 34 },
  { name: "Archive", items: 89 },
  { name: "Important", items: 15 },
  { name: "Backup", items: 67 },
];

const repeatedFolders = Array(3).fill(folders).flat();

const recentActivities = [
  { name: "Modified Annual Report 2023.pdf", time: "2 hours ago" },
  { name: "Created Q4 Analysis.xlsx", time: "4 hours ago" },
  { name: "Shared Project Timeline.docx", time: "6 hours ago" },
];

const notifications = [
  { id: 1, text: "You have upcoming activities due", time: "26 days 15 hours ago" },
  { id: 2, text: "Maintenance task completed", time: "3 days ago" },
  { id: 3, text: "New request received", time: "1 hour ago" }
];

const DashboardA = (props) => {
  //console.log(user)
  // Card data
  let navigate = useNavigate()
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false); // State for notification popup
  /*const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);*/

  const selector = useSelector(state=>state)
  const cardData = [
    { label: "Department", count: "1500+" },
    { label: "Rooms", count: "1500+" },
    { label: "Transport", count: "13" },
    { label: "Teaching", count: "15" },
    { label: "Non-Teaching", count: "150" },
  ];
  /*function getData(users){
    setUser(users)
    console.log(users)
  }*/
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

    const handleStock =()=>{
      navigate('/stock')
    }
    const handleReport=()=>{
      navigate('/report')
    }
  
    const handleMain=()=>{
      navigate('/maintenance')
    }
  
    const handleHome=()=>{
      navigate('/dashboard-admin')
    }
  
    const handleProfile=()=>{
      navigate('/profile')
    }
  
    const handleInfo=()=>{
      navigate('/information')
    }

    const ticket=()=>{
      navigate('/ticket')
    }

    const news=()=>{
      navigate('/news')
    }

    const logout=()=>{
      navigate('/')
    }

    const toggleEditDeleteButtons = () => {
      setShowEditDeleteButtons(!showEditDeleteButtons);
    };
  
    const toggleNotifications = () => {
      setNotificationsOpen(!notificationsOpen);
    };

    const noti=()=>{
      navigate('/notification')
    }

    const calender=()=>{
      navigate('/calender')
    }
    
    const noti_setting=()=>{
      navigate('/noti_setting')
    }
    

  return (
    <div className="app-container">
      {/*<header className="header">
        <div className='menu'>
        <GiHamburgerMenu className='menu-icon'/>
        <div>
          <select>
            <option>Dashboard</option>
            <option>Ticket</option>
            <option>Calendar</option>
          </select>
        </div>
        </div>
        <div className="logo-wrapper">
          <img src={Logo} alt="logo" className="logo-image" />
        </div>
        <nav className="nav">
          <ul type="none" className='nav-list'>
            <button className='nav-button' onClick={handleHome}>Home</button>
            <button className='nav-button' onClick={handleStock}>Stock</button>
            {selector.userDetails.dept!=='CSE' && selector.userDetails.dept!=='ECE' && <button className='nav-button' onClick={handleMain}>Maintenance</button>}
            <button className='nav-button' onClick={handleReport}>Report</button>
            <button className='nav-button' onClick={handleInfo}>Notification</button>
            <button className='nav-button' onClick={handleProfile}>Profile</button>
          </ul>
        </nav>
      </header>*/}
          {/*<div className="app-container">*/} 
      {/* Navbar */}
      <header className="header">
        <div className="left-section">
          <Menu className="menu-icon" size={28} onClick={() => setMenuOpen(!menuOpen)} />
          <div className="logo-wrapper">
            <img src={Logo} alt="logo" className="logo-image" />
          </div>
        </div>

        {/*<nav className="nav">
          {["Dashboard","Service","Report","News"].map((link, index) => (
            <a key={index} href="#" className="nav-link">
              {link}
            </a>
          ))}
        </nav>*/}

        <nav className="nav">
          <ul type="none" className='nav'>
            <button className='nav-link' onClick={handleHome}>Home</button>
            <button className='nav-link' onClick={handleStock}>Stock</button>
            {selector.userDetails.dept!=='CSE' && selector.userDetails.dept!=='ECE' && <button className='nav-link' onClick={handleMain}>Maintenance</button>}
            <button className='nav-link' onClick={handleReport}>Report</button>
            {/*<button className='nav-link' onClick={handleInfo}>Notification</button>*/}
          </ul>
        </nav>
        <div className='space'></div>

        {/*<div className="right-section">
          <User className="profile-icon" size={28} onClick={() => setProfileOpen(!profileOpen)} />
        </div>*/}

        {/* Popup Menus */}
        {menuOpen && (
          <div className="menu-popup">
          <button className="popup-item" onClick={handleHome}>📊 Dashboard</button>
          <button className="popup-item" onClick={ticket}>🎟 Ticket</button>
          <button className="popup-item" onClick={handleProfile}>👤 Profile</button>
          <button className="popup-item" onClick={news}>📰 News</button>
          <button className="popup-item" onClick={handleReport}>📜 Report</button>
          <button className="popup-item" onClick={calender}>📅 Calendar</button>
      
        </div>

        )}
        <div className="right-section">
              
              <div className="notification-wrapper">
                <Bell className="notification-icon" size={28} onClick={toggleNotifications} />
                {/* Notification Popup */}
                {notificationsOpen && (
                  <div className="notification-popup">
                    <div className="notification-header">
                      <h3>Notifications</h3>
                      <div className="notification-actions">
                        {/*<AiOutlineCheck className="tick-icon" />*/}
                        <AiOutlineSetting className="settings-icon" onClick={noti_setting}/>
                      </div>
                    </div>
                    <div className="notification-list">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="notification-item">
                          <p>{notification.text}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                      ))}
                    </div>
                    <button className="see-all-button" onClick={noti}>See all</button>
                  </div>
                )}
              </div>
              
            </div>
            <div>
            <User className="profile-icon" size={28} onClick={() => setProfileOpen(!profileOpen)}/>
            </div>
            
        {profileOpen && (
          <div className="profile-popup">
            <button className="popup-item" onClick={handleHome}>📊 Dashboard</button>
            <button className="popup-item" onClick={handleProfile}>👤 Profile</button>
            <button className="popup-item" onClick={news}>📰 News</button>
            <button className="popup-item" onClick={logout}>🚪 Logout</button>
          </div>
        )}
      </header>

      <main className="main-content-dash">
      <div className="Back-Container-dash" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
  <button className="arrow left" onClick={prevImage}>&#9665;</button>
  <button className="arrow right" onClick={nextImage}>&#9655;</button>
          <div className="overview-cards-dash">
            {cardData.map((item, index) => (
              <div key={index} className="card-dash">
                <div className="card-content-dash">
                  <div className="card-number-dash">{item.count}</div>
                  <div className="card-label-dash">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-sections-dash">
        <section className="news-section-dash">
  <h2 className="section-title-dash">News Update</h2>
  <div className="news-list-container"> {/* Scrollable container */}
    <div className="news-list-dash">
      {[
        { title: "Water Supply Maintenance", date: "2024-02-15", priority: "High" },
        { title: "IT Infrastructure Update", date: "2024-02-14", priority: "Medium" },
        { title: "Building Renovation", date: "2024-02-13", priority: "Normal" },
        
      ].map((news, index) => (
        <div key={index} className="news-item-dash">
          <div>
            <h3 className="news-title-dash">{news.title}</h3>
            <p className="news-date-dash">{news.date}</p>
          </div>
          <span className={`priority-badge priority-${news.priority.toLowerCase()}`}>
            {news.priority} Priority
          </span>
        </div>
      ))}
    </div>
  </div>
</section>


          <section className="ticket-section-dash">
            <h2 className="section-title-dash">Ticket Raising</h2>
            {/*<form className="ticket-form" onSubmit={(e) => { e.preventDefault(); }}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select>
                  <option>Select department</option>
                  <option>Maintenance</option>
                  <option>IT</option>
                  <option>Engineering</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Describe your issue"></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>*/}
            <img className='Ticket-dash' src={Ticket} alt="My Image" width="200" />
            <button className='raise-dash' onClick={ticket}>Raise a Ticket</button>
          </section>
        </div>
      </main>

      <footer className="footer-admin">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="footer-item">
            <label>Phone</label>
            <span>+123 567 890</span>
          </div>
          <div className="footer-item">
            <label>Email</label>
            <span>support@maintenance.edu</span>
          </div>
          <div className="footer-item">
            <label>Address</label>
            <span>123 Campus Street, Education City</span>
          </div>
        </div>
        <div className="footer-section">
          <h3>Office Hours</h3>
          <div className="footer-item">
            <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardA;
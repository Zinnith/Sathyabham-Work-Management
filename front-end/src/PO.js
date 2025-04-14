import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineEdit, AiOutlineCheck, AiOutlineSetting } from "react-icons/ai";
import { Folder, Upload, Share, Download, Trash, Menu, User,Bell,Settings } from "lucide-react";
import { useSelector } from "react-redux";
import Logo from './Bama.png';
import { useEffect} from 'react';
//import Logo from "./assets/Sathyaa.png";
import DefaultProfileIcon from "./assets/profile.jpg";
import { useNavigate } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import "./PO.css";

const tranImages = [
  require('./assets/Trans1.jpg'),
  require('./assets/Trans2.jpg'),
  require('./assets/Trans3.jpg'),
  require('./assets/Trans4.jpg'),
  require('./assets/Trans5.jpg'),
  require('./assets/Trans6.jpg'),
];


const PO = () => {
  let navigate = useNavigate()
  const selector = useSelector(state=>state)
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [poList, setPoList] = useState([]); // Store saved PO files
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [textContent, setTextContent] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showFileInput, setShowFileInput] = useState(false);
  

  // Handle PO Creation
  const handleCreatePO = () => {
    setShowFileInput(true); // Show file input when clicking "Create PO"
  };

  // Save PO in Right Panel
  const handleSavePO = () => {
    if (!textContent) {
      alert("Notepad is empty!");
      return;
    }
    const newPO = { name: fileName, content: textContent };
    setPoList([...poList, newPO]); // Update state
    setFileName("");
    setTextContent("");
    setNotepadOpen(false);
  };

  // Generate PDF
  const handleGeneratePDF = () => {
    if (!textContent) {
      alert("Notepad is empty!");
      return;
    }
    const pdf = new jsPDF();
    pdf.text(textContent, 10, 10);
    pdf.save(`${fileName}.pdf`);
  };  // ✅ 

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  }
  const handleFileSubmit = () => { // FIXED: Function added
    if (fileName.trim() !== "") {
      setShowFileInput(false);
      setNotepadOpen(true); // Open Notepad after entering file name
    } else {
      alert("Please enter a file name.");
    }
  }
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false); // State for notification popup
  /*const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);*/

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
    if (selector.userDetails.position=="End User"){
      navigate('/enduser')
    }
    else{
      navigate('/dashboard-admin')
    }
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
  const [currentTranIndex, setCurrentTranIndex] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
     
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTranIndex((prevIndex) => (prevIndex + 1) % tranImages.length);
      setRotateY((prevRotate) => prevRotate + 90); // Rotate cube-like
    }, 1500); // Change every 3.5 seconds
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="app-container-noti">
      <header className="header">
        <div className="left-section">
          <Menu className="menu-icon" size={28} onClick={() => setMenuOpen(!menuOpen)} />
          <div className="logo-wrapper">
            <img src={Logo} alt="logo" className="logo-image" />
          </div>
          <div className="Tran-container">
    <div className="Tran-wrapper" style={{ transform: `rotateY(${rotateY}deg)` }}>
      {tranImages.map((image, index) => (
        <div key={index} className={`Tran-face face-${index}`} style={{ backgroundImage: `url(${image})` }}></div>
      ))}
    </div>
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
            {selector.userDetails.position!=="End User" && <button className='nav-link' onClick={handleStock}>Stock</button>}
            {selector.userDetails.dept!=='CSE' && selector.userDetails.dept!=='ECE' && selector.userDetails.position!=="End User" && <button className='nav-link' onClick={handleMain}>Maintenance</button>}
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
          {selector.userDetails.position!=="End User" && <button className="popup-item" onClick={ticket}>🎟 Ticket</button>}
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

      <div className="po-container">
      {/* Left Side - Create PO */}
      <div className="left-container-po">
        <h2>Create a Purchase Order</h2>
        <button onClick={handleCreatePO} className="create-btn">Create PO</button>

        {/* Show file input popup */}
        {showFileInput && (
          <div className="file-input-popup-po">
            <input
              type="text"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="file-input-po"
            />
            <button onClick={handleFileSubmit} className="ok-btn-po">OK</button>
            <button onClick={() => setShowFileInput(false)} className="cancel-btn-po">Cancel</button>
          </div>
        )}
      </div>

      {/* Notepad Editor in Modal */}
      {notepadOpen && (
        <div className="notepad-modal">
          <div className="notepad">
            <h3>Editing: {fileName}</h3>
            <textarea
              placeholder="Type your document..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="notepad-textarea"
            ></textarea>
            <div className="notepad-buttons">
              <button onClick={handleSavePO} className="save-btn">Save</button>
              <button onClick={() => setNotepadOpen(false)} className="cancel-btn">Cancel</button>
              <button onClick={handleGeneratePDF} className="generate-btn">Generate PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* Right Side - Saved PO List */}
      <div className="right-container-po">
        <h3>Saved POs</h3>
        {poList.length === 0 ? (
          <p>No POs saved</p>
        ) : (
          <ul>
            {poList.map((po, index) => (
              <li key={index} className="saved-po-item">
                <FaFileAlt className="file-icon" />
                {po.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
      
      <footer className="footer-noti-po">
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

export default PO;


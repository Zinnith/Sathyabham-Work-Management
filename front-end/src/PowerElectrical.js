import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineEdit, AiOutlineCheck, AiOutlineSetting } from "react-icons/ai";
import { Folder, Upload, Share, Download, Trash, Menu, User,Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Information.css"; // Import the CSS file
import Logo from "./Bama.png"; // Ensure the logo path is correct

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

const PowerElectrical = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name"); // State for sort criteria
  let navigate = useNavigate()
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false); // State for notification popup
  /*const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);*/

  const selector = useSelector(state=>state)

  const handleNewFolderClick = () => {
    setIsPopupOpen(true);
  };

  const handleSaveFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        name: newFolderName,
        items: 0,
        date: new Date().toLocaleDateString(), // Add date for sorting
        size: Math.floor(Math.random() * 1000), // Add size for sorting
      };
      setFolders([...folders, newFolder]);
      setIsPopupOpen(false);
      setNewFolderName("");
    }
  };

  const handleFolderClick = (folderName) => {
    navigate(`/folder/${folderName}`); // Navigate to the FilePage with folderName
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    sortFolders(criteria);
  };

  const sortFolders = (criteria) => {
    const sortedFolders = [...folders].sort((a, b) => {
      if (criteria === "name") {
        return a.name.localeCompare(b.name);
      } else if (criteria === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (criteria === "size") {
        return b.size - a.size;
      }
      return 0;
    });
    setFolders(sortedFolders);
  };

  const folder=()=>{
    navigate('/filepage-pe')
  }

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

      {/* Main Dashboard */}
      <div className="dashboard-container">
        <h1 className="dashboard-title">POWER ELECTRICAL</h1>

        <div className="dashboard-content">
          {/* Left Section - Folders */}
          <div className="folders-section">
            <div className="folders-header">
              {folders.length > 1 && (
                <div className="sort-dropdown">
                  <label htmlFor="sort-by">Sort by:</label>
                  <select
                    id="sort-by"
                    value={sortCriteria}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="date">Date</option>
                    <option value="size">Size</option>
                  </select>
                </div>
              )}
            </div>

            <div className="folders-grid" onClick={()=>{folder()}}>
              {folders.length === 0 ? (
                <div className="no-folder-message">
                  <p>No folders available. Create a new folder to get started.</p>
                </div>
              ) : (
                folders.map((folder, index) => (
                  <div
                    key={index}
                    className="folder-card"
                    onClick={() => handleFolderClick(folder.name)}
                  >
                    <Folder className="folder-icon" size={30} />
                    <p className="folder-name">{folder.name}</p>
                    <p className="folder-items">{folder.items} items</p>
                    <p className="folder-date">Modified: {folder.date}</p>
                    <p className="folder-size">Size: {folder.size} KB</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Section - Quick Actions & Recent Activity */}
          <div className="right-panel">
            <button className="new-folder-btn" onClick={handleNewFolderClick}>
              New Folder+
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <h2>Recent Activity</h2>
          <div className="footer-activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="footer-activity-item">
                <p className="footer-activity-name">{activity.name}</p>
                <p className="footer-activity-time">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* Popup for New Folder */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Create New Folder</h3>
            <input
              type="text"
              placeholder="Enter folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <button onClick={handleSaveFolder}>Save</button>
            <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PowerElectrical;
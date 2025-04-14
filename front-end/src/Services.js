import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {useEffect} from 'react';
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineEdit, AiOutlineCheck, AiOutlineSetting } from "react-icons/ai";
import {  Upload, Share, Download, User,Bell} from "lucide-react";
import { useSelector } from "react-redux";
import { Folder, Trash, Edit2 } from "lucide-react";

import { Menu, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate for navigation
import "./Information.css"; // Import the CSS file
import Logo from "./Bama.png"; // Ensure the logo path is correct
const tranImages = [
  require('./assets/Trans1.jpg'),
  require('./assets/Trans2.jpg'),
  require('./assets/Trans3.jpg'),
  require('./assets/Trans4.jpg'),
  require('./assets/Trans5.jpg'),
  require('./assets/Trans6.jpg'),
];
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

const Services = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name"); // State for sort criteria
  const [showDeleteIcons, setShowDeleteIcons] = useState(false);
  const [showEditIcons, setShowEditIcons] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [folderToEdit, setFolderToEdit] = useState(null);
  const [editContent, setEditContent] = useState("");
  let navigate = useNavigate()
const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
const [notificationsOpen, setNotificationsOpen] = useState(false); // State for notification popup
const {heading} = useParams()
/*const [menuOpen, setMenuOpen] = useState(false);
const [profileOpen, setProfileOpen] = useState(false);*/

const selector = useSelector(state=>state)

  const handleNewFolderClick = () => {
    setIsPopupOpen(true);
  };
  useEffect(() => {
    const storedFolders = localStorage.getItem("folders") || {};
    if (storedFolders[heading]) {
      setFolders(JSON.parse(storedFolders));
    } else {
      setFolders([]);
    }
  }, [heading]);
  
  const updateFolders = (newFolders) => {
    const storedFolders = JSON.parse(localStorage.getItem("folders")) || {};
    storedFolders[heading] = newFolders; // Store under the correct category
    localStorage.setItem("folders", JSON.stringify(storedFolders));
    setFolders(newFolders);
  };
  
  
  const handleSaveFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        name: newFolderName,
        content: "",
        date: new Date().toLocaleDateString(),
      };
      const updatedFolders = [...folders, newFolder];
      updateFolders(updatedFolders);
      setNewFolderName("");
      setIsPopupOpen(false);
    }
  };
  


  const handleFolderClick = (folderName) => {
    navigate(`/filepage/${heading}/${folderName}`); // Navigate to the FilePage with folderName
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

  /*const folder=()=>{
    navigate(`filepage/${name}`)
  }*/

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
  const [currentTranIndex, setCurrentTranIndex] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
     
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTranIndex((prevIndex) => (prevIndex + 1) % tranImages.length);
      setRotateY((prevRotate) => prevRotate + 90); // Rotate cube-like
    }, 1500); // Change every 3.5 seconds
  
    return () => clearInterval(interval);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDeleteMode = () => {
    setShowDeleteIcons(!showDeleteIcons);
    setShowEditIcons(false);
  };

  const toggleEditMode = () => {
    setShowEditIcons(!showEditIcons);
    
    setShowDeleteIcons(false)
  };

  const confirmDeleteFolder = (folderName) => {
    setFolderToDelete(folderName);
  };

  const handleDeleteFolder = () => {
    const updatedFolders = folders.filter((folder) => folder.name !== folderToDelete);
    updateFolders(updatedFolders);
    setFolderToDelete(null);
    setShowDeleteIcons(false);
    setShowEditIcons(false); // Hide delete icons after deletion
  };
  

  const handleEditFolder = (folder) => {
    setFolderToEdit(folder);
    setEditContent(folder.name);
    setShowDeleteIcons(false);
  };

  const handleSaveEdit = () => {
    const updatedFolders = folders.map((folder) =>
      folder.name === folderToEdit.name ? { ...folder, name: editContent } : folder
    );
    updateFolders(updatedFolders);
    setFolderToEdit(null);
    setShowEditIcons(false); // Hide edit icons after saving
  };

  return (
    <div className="app-container">
      {/* Navbar */}
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
      <h1 className="dashboard-title">{heading}</h1>
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
              <div className="folders-grid">
{folders.length === 0 ? (
  <div className="no-folder-message">
    <p>No folders available. Create a new folder to get started.</p>
  </div>
) : (
  folders.map((folder, index) => (
    <div
      key={index}
      className="folder-card"
      onClick={() => handleFolderClick(folder.name)} // Keep onClick here only
    >
      <Folder className="folder-icon" size={30} />
      <p className="folder-name">{folder.name}</p>
     
      <p className="folder-date">Modified: {folder.date}</p>
      <p className="folder-size">Size: {folder.size} KB</p>
      {showDeleteIcons && (
    <Trash
      className="delete-icon"
      size={20}
      onClick={(e) => {
        e.stopPropagation(); // Prevent navigation
        confirmDeleteFolder(folder.name);
      }}
    />
  )}
            {showEditIcons && (
              <Edit2
              className="edit-icon"
              size={20}
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation
                handleEditFolder(folder);
              }}
            />
            )}
    </div>
                ))
              )}
            </div>
            
      <div className="right-panel">
         <div className="dropdown-container"> 
        <button onClick={() => setIsOpen(!isOpen)} className="toggle-btn-btn"> ☰ </button> 
        {/* Dropdown Menu */} 
        {isOpen && ( <div className="dropdown-menu-btn">
           <button className="dropdown-item-btn" onClick={handleNewFolderClick}>New Folder</button>
            <button className="dropdown-item-btn" onClick={toggleDeleteMode}>Delete</button> 
            <button className="dropdown-item-btn"  onClick={toggleEditMode}>Rename</button> </div> )}
             </div> 
             </div>
{/* 
      <div className="folders-grid">
        {folders.map((folder, index) => (
          <div key={index} className="folder-card">
            <Folder className="folder-icon" size={30} />
            <p className="folder-name">{folder.name}</p>
            <p className="folder-date">Modified: {folder.date}</p>
            {showDeleteIcons && (
              <Trash
                className="delete-icon"
                size={20}
                onClick={() => confirmDeleteFolder(folder.name)}
              />
            )}
            {showEditIcons && (
              <Edit2
                className="edit-icon"
                size={20}
                onClick={() => handleEditFolder(folder)}
              />
            )}
          </div>
        ))}
      </div>
      </div> */}

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

      {folderToDelete && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete {folderToDelete}?</p>
            <button onClick={handleDeleteFolder}>Yes</button>
            <button onClick={() => setFolderToDelete(null)}>No</button>
          </div>
        </div>
      )}

{folderToEdit && (
  <div className="popup-overlay">
    <div className="popup-content">
      <h3>Edit Folder</h3>
      <input
        type="text"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
      />
      <button onClick={handleSaveEdit}>Save</button>
      <button onClick={() => setFolderToEdit(null)}>Cancel</button>
      <button className="delete-btn" onClick={() => handleDeleteFolder(folderToEdit.name)}>Delete</button>
    </div>
  </div>
)}

    </div>

      
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
    
    </div>
    </div>
  );
};

export default Services;
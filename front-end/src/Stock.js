import React, { useState } from "react";
import "./Stock.css";
import companyLogo from "./Bama.png";
import computingImage from "./schoolofcomputing.jpg";
import mechImage from "./mechanical.jpg";
import civilImage from "./civil.jpg";
import artsImage from "./arts.jpg";
import lawImage from "./law.jpeg";
import eceImage from "./ece.jpg";
import eeeImage from "./eee.jpg";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineEdit, AiOutlineCheck, AiOutlineSetting, AiOutlineMinus } from "react-icons/ai";
import { Folder, Upload, Share, Download, Trash, Menu, User,Bell,Settings } from "lucide-react";
import { useSelector } from "react-redux";
import Logo from './Bama.png';
import { TbEdit } from "react-icons/tb";

const initialSchools = [
  { name: "SCHOOL OF COMPUTING", image: computingImage },
  { name: "SCHOOL OF MECH", image: mechImage },
  { name: "SCHOOL OF CIVIL", image: civilImage },
  { name: "SCHOOL OF ARTS", image: artsImage },
  { name: "SCHOOL OF LAW", image: lawImage },
  { name: "SCHOOL OF ECE", image: eceImage },
  { name: "SCHOOL OF EEE", image: eeeImage },
];

const notifications = [
  { id: 1, text: "You have upcoming activities due", time: "26 days 15 hours ago" },
  { id: 2, text: "Maintenance task completed", time: "3 days ago" },
  { id: 3, text: "New request received", time: "1 hour ago" }
];

const Stock = () => {
  const [editedName, setEditedName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [schools, setSchools] = useState(initialSchools);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptImage, setNewDeptImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editMode, setEditMode] = useState(false); // Edit mode state
  const [editingSchool, setEditingSchool] = useState(null); // School being edited
  const [deleteMode, setDeleteMode] = useState(false); // Delete mode state
  const [schoolToDelete, setSchoolToDelete] = useState(null); // School to delete
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false); // State for showing edit/delete buttons
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const selector = useSelector(state=>state)
  let navigate = useNavigate()
  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewDeptImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAddDepartment = () => {
    if (!newDeptName || !newDeptImage) {
      alert("Please fill in all fields.");
      return;
    }
    setShowConfirmPopup(true);
  };

  const confirmAddDepartment = () => {
    const newDepartment = {
      name: newDeptName,
      image: previewImage,
    };
    setSchools([...schools, newDepartment]);
    setShowAddPopup(false);
    setShowConfirmPopup(false);
    setNewDeptName("");
    setNewDeptImage(null);
    setPreviewImage(null);
  };

  const handleEditButtonClick = () => {
    setEditMode(!editMode); // Toggle edit mode
    setDeleteMode(false); // Disable delete mode if active
  };

  const handlePenIconClick = (index) => {
    setEditingSchool(index); // Set the school being edited
  };

  const handleSaveEdit = (index, updatedName) => {
    const updatedSchools = [...schools];
    updatedSchools[index] = {
      ...updatedSchools[index],
      name: updatedName,
    };
   setSchools(updatedSchools);
    setSchools(updatedSchools);
    setEditingSchool(null); // Exit edit mode
  };

  const handleDeleteButtonClick = () => {
    setDeleteMode(!deleteMode); // Toggle delete mode
    setEditMode(false); // Disable edit mode if active
  };

  const handleMinusIconClick = (index) => {
    setSchoolToDelete(index); // Set the school to delete
    setShowConfirmPopup(true);
  };

  const confirmDeleteSchool = () => {
    const updatedSchools = schools.filter((_, i) => i !== schoolToDelete);
    setSchools(updatedSchools);
    setSchoolToDelete(null); // Reset school to delete
    setDeleteMode(false); // Disable delete mode
    setShowConfirmPopup(false);
  };

  const cancelAction = () => {
    setShowConfirmPopup(false);
    setSchoolToDelete(null);
  };

  // Function to toggle the visibility of the edit/delete buttons
  const toggleEditDeleteButtons = () => {
    setShowEditDeleteButtons(!showEditDeleteButtons);
  };

  // Function to handle the "Add New" button click
  const handleAddButtonClick = () => {
    setShowAddPopup(true);
    setShowEditDeleteButtons(false); // Close the vertical buttons after clicking
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleCard=(name)=>{
    /*if (name=='SCHOOL OF COMPUTING'){
      navigate('/cs')
    }
    else if(name=='SCHOOL OF MECH'){
      navigate('/mech')
    }
    else if(name=='SCHOOL OF CIVIL'){
      navigate('/civil')
    }
    else if(name=='SCHOOL OF ARTS'){
      navigate('/arts')
    }
    else if(name=='SCHOOL OF LAW'){
      navigate('/law')
    }
    else if(name=='SCHOOL OF ECE'){
      navigate('/ece')
    }
    else if(name=='SCHOOL OF EEE'){
      navigate('/eee')
    }*/
   navigate(`/departments/${name}`)
    
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
    <div className="app-container-stock">
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

      {/* Action Buttons Container */}
      {selector.userDetails.position=="Super-Admin" && <div className="action-buttons-container-stock">
        <button className="pen-icon-stock" onClick={toggleEditDeleteButtons}>
          <TbEdit size={35} />
          </button>
        {showEditDeleteButtons && (
          <div className="action-buttons-stock">
            <button className="add-button-stock" onClick={handleAddButtonClick}>
              Add New
            </button>
            <button className="edit-button-stock" onClick={handleEditButtonClick}>
              {editMode ? "Cancel Edit" : "Edit"}
            </button>
            <button className="delete-button-stock" onClick={handleDeleteButtonClick}>
              {deleteMode ? "Cancel Delete" : "Delete"}
            </button>
          </div>
        )}
      </div>}

      {/* Search & Add Button */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search departments..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
      </div>

      {/* Departments Grid */}
      <div className="grid">
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school, index) => (
            <div className="card-stock" key={index} onClick={()=>{handleCard(school.name)}}>
          {/* Edit Button */}
{editMode && (
  <button
    className="pen-icon-button-stock"
    onClick={(event) => {
      event.stopPropagation(); // Prevents navigation
      handlePenIconClick(index);
    }}
  >
    <AiOutlineEdit size={20} />
  </button>
)}

{deleteMode && (
  <button
    className="minus-icon-button-stock"
    onClick={(event) => {
      event.stopPropagation(); // Prevents navigation
      handleMinusIconClick(index);
    }}
  >
    <AiOutlineMinus size={20} />
  </button>
)}
            {/* Edit Form */}
            {editingSchool === index ? (
  <div className="edit-form" onClick={(event) => event.stopPropagation()}> {/* Prevent navigation */}
    <input
      type="text"
      value={editedName} // Use a temporary state for changes
      onClick={(event) => event.stopPropagation()} // Prevent navigation
      onChange={(e) => setEditedName(e.target.value)}
    />
    <button onClick={(event) => {
      event.stopPropagation(); // Prevent navigation
      handleSaveEdit(index, editedName); // Save changes
    }}>
      Save
    </button>
    <button onClick={(event) => {
      event.stopPropagation(); // Prevent navigation
      setEditingSchool(null); // Exit edit mode
      setEditedName(schools[index].name); // Reset input to original value
    }}>
      Cancel
    </button>
  </div>
) : (
  <>
    <div
      className="card-image"
      style={{ backgroundImage: `url(${school.image})` }}
      onClick={(event) => {event.stopPropagation(); handleCard(school.name)}} // Prevent navigation
    ></div>
    <div className="card-footer" onClick={(event) => event.stopPropagation()}> {/* Prevent navigation */}
      {school.name}
    </div>
  </>
)}

              {/* Pen Icon for Editing */}
              {editMode && (
                <button className="pen-icon-button-stock" onClick={() => handlePenIconClick(index)}>
                  <AiOutlineEdit size={20} />
                </button>
              )}
              {/* Minus Icon for Deleting */}
              {deleteMode && (
                <button className="minus-icon-button-stock" onClick={() => handleMinusIconClick(index)}>
                  <AiOutlineMinus size={20} />
                </button>
              )}
              {/* Edit Form */}
              {editingSchool === index ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={school.name}
                    onChange={(e) => {
                      const updatedSchools = [...schools];
                      updatedSchools[index].name = e.target.value;
                      setSchools(updatedSchools);
                    }}
                  />
                  <button onClick={() => handleSaveEdit(index, school.name)}>Save</button>
                  <button onClick={() => setEditingSchool(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url(${school.image}) `}}
                  ></div>
                  <div className="card-footer">{school.name}</div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">No matching departments found.</p>
        )}
      </div>

      {/* Add Department Popup */}
      {showAddPopup && (
        <div className="popup-overlay-stock">
          <div className="popup-box">
            <h2>Add New Department</h2>
            <input
              type="text"
              placeholder="Enter Department Name"
              className="popup-input"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
            />
            <input type="file" className="popup-input" onChange={handleImageChange} />
            {previewImage && <img src={previewImage} alt="Preview" className="preview-image" />}
            <button className="popup-btn" onClick={handleAddDepartment}>
              Upload
            </button>
            <button className="popup-btn cancel" onClick={() => setShowAddPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>
              {schoolToDelete !== null
                ? "Are you sure you want to delete this department?"
                : "Do you want to create a new department?"}
            </h3>
            {schoolToDelete !== null ? (
              <p>Department Name: <b>{schools[schoolToDelete].name}</b></p>
            ) : (
              <p>Department Name: <b>{newDeptName}</b></p>
            )}
            <button
              className="popup-btn confirm"
              onClick={schoolToDelete !== null ? confirmDeleteSchool : confirmAddDepartment}
            >
              Yes
            </button>
            <button className="popup-btn cancel" onClick={cancelAction}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
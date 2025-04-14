import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineEdit, AiOutlineCheck, AiOutlineSetting } from "react-icons/ai";
import { Folder, Upload, Share, Download, Trash, Menu, User,Bell,Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to read URL parameters
import "./file_page.css";
import axios from "axios"; // Import axios
import Logo from "./Bama.png";

const notifications = [
  { id: 1, text: "You have upcoming activities due", time: "26 days 15 hours ago" },
  { id: 2, text: "Maintenance task completed", time: "3 days ago" },
  { id: 3, text: "New request received", time: "1 hour ago" }
];




const Filepage = () => {
 
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);

  const exampleFiles = [];

  const navigate = useNavigate();

  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false); // State for notification popup
  const {heading,folder_name} = useParams()
  const [selectedFile, setSelectedFile] = useState(null);

  /*const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);*/

  const selector = useSelector(state=>state)

  useEffect(() => {
    fetchFiles();
  }, [folder_name]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/files`);
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
  
    if (!file) {
      console.log("No file selected");
      return;
    }
  
    if (!heading || !folder_name) {
      console.error("Department or subfolder is missing!");
      return;
    }
  
    console.log(`Uploading file to: uploads/${heading}/${folder_name}`);
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post(`http://localhost:5003/upload/${heading}/${folder_name}`, formData);
      console.log("Upload successful:", response.data);
  
      // Update UI immediately
      setFiles(prevFiles => [...prevFiles, { name: file.name, size: file.size }]);
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
    }
  };
  
  
  
  const handleFileClick = (fileName) => {
    setSelectedFile(fileName);
    console.log("Selected File:", fileName);
  };
  

  const handleFileDelete = async (fileName) => {
    if (!fileName) {
      console.error("No file selected for deletion.");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:5003/files/${heading}/${folder_name}/${fileName}`);
      console.log("File deleted:", response.data);
  
      // Remove deleted file from UI
      setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
      setSelectedFile(null); // Reset selected file
  
    } catch (error) {
      console.error("Error deleting file:", error.response?.data || error.message);
    }
  };
  
  

  const handleFileDownload = async (fileName) => {
    if (!fileName) {
      console.error("No file selected for download.");
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:5003/download/${heading}/${folder_name}/${fileName}`, {
        responseType: "blob", // Important to get raw file data
      });
  
      console.log("Download successful:", response);
  
      // Create URL for downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Set correct file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error("Error downloading file:", error.response?.data || error.message);
    }
  };
  
  
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

      {/* Main Content */}
      <div className="dashboard-container">
        <h1 className="dashboard-title">{heading}</h1><br></br>
        <h2 className="folder-title-service">{folder_name}</h2> {/* Display the folder name */}

        <div className="quick-actions">
          <div className="hamburger-menu" onClick={() => setQuickActionsOpen(!quickActionsOpen)}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div><br></br><br></br>
          {quickActionsOpen && (
            <div className="action-buttons">
               <button className="action-btn">
               <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
             <Upload size={18} className="action-icon" /> Upload
             </label>
          <input 
             id="file-upload" 
            type="file" 
            style={{ display: "none" }} 
           onChange={handleFileUpload} 
         />
          </button>

          <button className="action-btn" onClick={() => alert("Share feature coming soon!")}>
            <Share size={18} className="action-icon" /> Share
          </button>
          <button className="action-btn" onClick={() => selectedFile && handleFileDownload(selectedFile)}>
            <Download size={18} className="action-icon" /> Download
          </button>

              {/*<button className="action-btn">
                <Eye size={18} className="action-icon" /> View
              </button>*/}
              <button className="action-btn" onClick={() => selectedFile && handleFileDelete(selectedFile)}>
            <Trash size={18} className="action-icon" /> Delete
          </button>
            </div>
          )}
        </div>

        <div className="file-container">
        {files.length > 0 ? (
  files.map((file, index) => (
    <div 
      key={index} 
      className={`file-card ${selectedFile === file.name ? 'selected' : ''}`} 
      onClick={() => handleFileClick(file.name)}
    >
      <Folder className="file-icon" size={20} />
      <div className="file-details">
        <p className="file-name">{file.name}</p>
        
      </div>
    </div>
  ))
) : (
  <p className="no-files-msg">No files in this folder.</p>
)}

      </div>
    </div>
  </div>
  );
};

export default Filepage;

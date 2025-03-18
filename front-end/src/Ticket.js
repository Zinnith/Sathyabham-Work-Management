import { useState } from "react";
import "./Ticket.css";
import Logo from "./assets/Sathyaa.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineEdit, AiOutlineCheck, AiOutlineSetting } from "react-icons/ai";
import { Folder, Upload, Share, Download, Trash, Menu, User,Bell,Edit,Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const notifications = [
  { id: 1, text: "You have upcoming activities due", time: "26 days 15 hours ago" },
  { id: 2, text: "Maintenance task completed", time: "3 days ago" },
  { id: 3, text: "New request received", time: "1 hour ago" }
];

const Ticket = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  let navigate = useNavigate()
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false); // State for notification popup
  /*const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);*/

  const selector = useSelector(state=>state)
  const [ticket, setTicket] = useState({
    department: "",
    ticketImage: null,
    block: "",
    description: "",
    priority: "",
    assignedTo: "",
  });

  const handleInputChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setTicket({ ...ticket, ticketImage: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTickets = [...tickets];
      updatedTickets[editIndex] = ticket;
      setTickets(updatedTickets);
      setEditIndex(null);
    } else {
      setTickets([...tickets, ticket]);
    }
    setTicket({
      department: "",
      ticketImage: null,
      block: "",
      description: "",
      priority: "",
      assignedTo: "",
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTicket(tickets[index]);
  };

  const handleDelete = (index) => {
    setTickets(tickets.filter((_, i) => i !== index));
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

  {/*const ticket=()=>{
    navigate('/ticket')
  }*/}

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
    <div className="app-container-ticket">
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

      {/* Page Heading */}
      <h1 className="page-heading">Ticket Management</h1>

      {/* Ticket Section */}
      <div className="ticket-container">
        {/* Left Side - Raised Tickets */}
        <div className="ticket-list">
          <h2>Raised Tickets</h2>
          <div className="ticket-scroll">
            {tickets.length === 0 ? (
              <p className="no-tickets">No tickets raised yet.</p>
            ) : (
              tickets.map((tkt, index) => (
                <div key={index} className="ticket-card">
                  {tkt.ticketImage && <img src={tkt.ticketImage} alt="Ticket" className="ticket-image" />}
                  <div className="ticket-info">
                    <p><strong>Dept:</strong> {tkt.department}</p>
                    <p><strong>Block:</strong> {tkt.block}</p>
                    <p><strong>Desc:</strong> {tkt.description}</p>
                    <p><strong>Priority:</strong> {tkt.priority}</p>
                    <p><strong>Assign:</strong> {tkt.assignedTo}</p>
                  </div>
                  <div className="ticket-actions">
                    <Edit className="edit-icon" size={20} onClick={() => handleEdit(index)} />
                    <Trash2 className="delete-icon" size={20} onClick={() => handleDelete(index)} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side - Raise Ticket Form */}
        <div className="ticket-form-wrapper">
          <div className="ticket-form-container">
            <h2>{editIndex !== null ? "Edit Ticket" : "Raise a Ticket"}</h2>
            <div className="form-scroll">
              <form className="ticket-form" onSubmit={handleSubmit}>
                <label className="small-heading">Department</label>
                <select name="department" value={ticket.department} onChange={handleInputChange}>
                  <option value="">Select Department</option>
                  {["CSE", "ECE", "EEE", "Mechanical", "IT", "BBA", "Aeronautical", "Arts"].map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                <label className="small-heading">Image (Optional)</label>
                <input type="file" name="ticketImage" onChange={handleFileChange} />

                <label className="small-heading">Block</label>
                <select name="block" value={ticket.block} onChange={handleInputChange}>
                  <option value="">Select Block</option>
                  {["Block1", "Block2", "Block3", "Block4", "Block5", "Block6", "Block7", "StPauls", "AdvanceStudies"].map((blk) => (
                    <option key={blk} value={blk}>{blk}</option>
                  ))}
                </select>

                <label className="small-heading">Description</label>
                <textarea name="description" value={ticket.description} onChange={handleInputChange} placeholder="Enter description" />

                <label className="small-heading">Priority</label>
                <select name="priority" value={ticket.priority} onChange={handleInputChange}>
                  <option value="">Select Priority</option>
                  {["High", "Medium", "Low"].map((prio) => (
                    <option key={prio} value={prio}>{prio}</option>
                  ))}
                </select>

                <label className="small-heading">Assign To</label>
                <select name="assignedTo" value={ticket.assignedTo} onChange={handleInputChange}>
                  <option value="">Select Person</option>
                  {["Tamizh", "Tharun", "Raja", "Nishar", "Mohan"].map((person) => (
                    <option key={person} value={person}>{person}</option>
                  ))}
                </select>

                <button type="submit">{editIndex !== null ? "Update" : "Submit"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
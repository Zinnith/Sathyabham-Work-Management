import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMenu, AiOutlineClose, AiOutlinePlus, AiOutlineEdit, AiOutlineCheck, AiOutlineSetting } from "react-icons/ai";
import { Folder, Upload, Share, Download, Trash, Menu, User,Bell } from "lucide-react";
import { useSelector } from "react-redux";
import "./Report.css";
import Logo from "./Bama.png"; // Ensure you have a logo file in src
import { useNavigate } from "react-router-dom";

const notifications = [
  { id: 1, text: "You have upcoming activities due", time: "26 days 15 hours ago" },
  { id: 2, text: "Maintenance task completed", time: "3 days ago" },
  { id: 3, text: "New request received", time: "1 hour ago" }
];

const Report = () => {
  let navigate = useNavigate()
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false); // State for notification popup
  /*const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);*/
  const selector = useSelector(state=>state)
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const statusCards = [
    { title: "IT Systems", status: "Operational", tasks: 12, issues: 2, icon: "🖥️", color: "#007bff" },
    { title: "Power", status: "Warning", tasks: 8, issues: 3, icon: "⚡", color: "#ffc107" },
    { title: "Water", status: "Operational", tasks: 5, issues: 1, icon: "💧", color: "#28a745" },
    { title: "AC", status: "Operational", tasks: 7, issues: 0, icon: "❄️", color: "#17a2b8" },
    { title: "Cleaning", status: "Review", tasks: 15, issues: 4, icon: "🧹", color: "#e83e8c" },
  ];

  const performanceData = [
    { name: "Week 1", IT: 80, Power: 70, Water: 60, AC: 75, Cleaning: 65 },
    { name: "Week 2", IT: 82, Power: 72, Water: 62, AC: 77, Cleaning: 67 },
    { name: "Week 3", IT: 85, Power: 75, Water: 65, AC: 79, Cleaning: 70 },
    { name: "Week 4", IT: 87, Power: 78, Water: 68, AC: 82, Cleaning: 73 },
  ];

  const resourceData = [
    { name: "IT", value: 30, color: "#007bff" },
    { name: "Power", value: 20, color: "#ffc107" },
    { name: "Water", value: 15, color: "#28a745" },
    { name: "AC", value: 25, color: "#17a2b8" },
    { name: "Cleaning", value: 10, color: "#e83e8c" },
  ];

  const recentTasks = [
    { task: "Server Maintenance", department: "IT", priority: "High", status: "In Progress", assignee: "John Smith", due: "2024-02-15" },
    { task: "Generator Check", department: "Power", priority: "Medium", status: "Pending", assignee: "Sarah Johnson", due: "2024-02-16" },
    { task: "Water Tank Cleaning", department: "Water", priority: "High", status: "Completed", assignee: "Mike Brown", due: "2024-02-14" },
    { task: "AC Filter Replacement", department: "AC", priority: "Medium", status: "In Progress", assignee: "Lisa Davis", due: "2024-02-15" },
    { task: "Office Deep Cleaning", department: "Cleaning", priority: "Low", status: "Scheduled", assignee: "Tom Wilson", due: "2024-02-17" },
  ];

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

  return (
    <div className="app-container">
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
      {/* Navbar 
      <header className="header">
        <div className="left-section">
          <Menu className="menu-icon" size={28} onClick={() => setMenuOpen(!menuOpen)} />
          <div className="logo-wrapper">
            <img src={Logo} alt="logo" className="logo-image" />
          </div>
        </div>

        <nav className="nav">
          {["Dashboard", "Stock", "Service", "Report"].map((link, index) => (
            <a key={index} href="#" className="nav-link">{link}</a>
          ))}
        </nav>

        <div className="right-section">
          <User className="profile-icon" size={28} onClick={() => setProfileOpen(!profileOpen)} />
        </div>

        {/* Popup Menus 
        {menuOpen && (
          <div className="menu-popup">
            <button className="popup-item">📊 Dashboard</button>
            <button className="popup-item">📅 Calendar</button>
            <button className="popup-item">📝 Create</button>
            <button className="popup-item">✏️ Update</button>
            <button className="popup-item">📖 Read</button>
            <button className="popup-item">🗑️ Delete</button>
            <button className="popup-item">📜 Report</button>
            <button className="popup-item">📰 News</button>

          </div>
        )}

        {profileOpen && (
          <div className="profile-popup">
            <button className="popup-item">📊 Dashboard</button>
            <button className="popup-item">👤 Profile</button>
            <button className="popup-item">🚪 Logout</button>
          </div>
        )}
      </header>*/}
      <div className="report">
        {/* Status Cards */}
        <div className="status-cards">
          {statusCards.map((card, index) => (
            <div className="status-card" key={index} style={{ borderColor: card.color }}>
              <div className="icon" style={{ backgroundColor: card.color }}>{card.icon}</div>
              <div className="status-info">
                <h4>{card.title}</h4>
                <p className="status">{card.status}</p>
                <p>{card.tasks} Tasks | {card.issues} Issues</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="charts">
          <div className="chart">
            <h3>Performance Trends</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="IT" stroke="#007bff" />
                <Line type="monotone" dataKey="Power" stroke="#ffc107" />
                <Line type="monotone" dataKey="Water" stroke="#28a745" />
                <Line type="monotone" dataKey="AC" stroke="#17a2b8" />
                <Line type="monotone" dataKey="Cleaning" stroke="#e83e8c" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart">
            <h3>Resource Allocation</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={resourceData} dataKey="value" outerRadius={80}>
                  {resourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="recent-tasks">
          <h3>Recent Tasks</h3>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Department</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assignee</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.task}</td>
                  <td>{task.department}</td>
                  <td><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span></td>
                  <td><span className={`status ${task.status.replace(" ", "-").toLowerCase()}`}>{task.status}</span></td>
                  <td>{task.assignee}</td>
                  <td>{task.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;

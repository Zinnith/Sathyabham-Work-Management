import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import Logo from "./assets/Sathyaa.png"; // Ensure correct path to the logo
import { Folder, Upload, Share, Download, Trash, Menu, User, Bell } from "lucide-react";
import { AiOutlineEdit, AiOutlineSetting } from "react-icons/ai"; // Import AiOutlineEdit
import "./Cs.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const notifications = [
  { id: 1, text: "You have upcoming activities due", time: "26 days 15 hours ago" },
  { id: 2, text: "Maintenance task completed", time: "3 days ago" },
  { id: 3, text: "New request received", time: "1 hour ago" }
];

const Civil = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("data");
    return savedData
      ? JSON.parse(savedData)
      : [
          { category: "CLASS ROOM", blocks: ["Block 1", "Block 2", "Block 3", "Block 4"], values: [6, 8, 7, 9] },
          { category: "COMPUTER", blocks: ["Block 1", "Block 2", "Block 3", "Block 4"], values: [6, 8, 7, 9] },
        ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [blockCount, setBlockCount] = useState(4);
  const [newBlocks, setNewBlocks] = useState(Array(blockCount).fill("Block"));
  const [newValues, setNewValues] = useState(Array(blockCount).fill(0));
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false); // Global edit mode
  const [deleteMode, setDeleteMode] = useState(false); // Global delete mode
  const [editingIndex, setEditingIndex] = useState(null); // Index of the card being edited
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // Confirmation popup
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Confirmation message
  const [confirmationAction, setConfirmationAction] = useState(null); // Action to perform on confirmation
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(false); // Toggle edit/delete buttons
  const [notificationsOpen, setNotificationsOpen] = useState(false); // State for notification popup
  /*const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);*/
  let navigate = useNavigate()

  const selector = useSelector(state=>state)
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData([]);
    } else {
      handleSearch();
    }
  }, [searchTerm]);

  const handleBlockCountChange = (e) => {
    const count = parseInt(e.target.value) || 1;
    setBlockCount(count);
    setNewBlocks(Array(count).fill("Block"));
    setNewValues(Array(count).fill(0));
  };

  const addNewEntry = () => {
    if (newCategory.trim() === "") return;

    setData([...data, { category: newCategory, blocks: newBlocks, values: newValues }]);

    setTimeout(() => {
      const lastCard = document.querySelector(".card-container-cs .card-cs:last-child");
      if (lastCard) {
        lastCard.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    setIsModalOpen(false);
    setNewCategory("");
    setBlockCount(4);
    setNewBlocks(Array(4).fill("Block"));
    setNewValues(Array(4).fill(0));
  };

  const handleDeleteEntry = (index) => {
    setConfirmationMessage("Are you sure you want to delete this entry?");
    setConfirmationAction(() => () => {
      const updatedData = data.filter((_, i) => i !== index);
      setFilteredData(filteredData.filter((item) => item !== data[index]));
      setData(updatedData);
      setShowConfirmationPopup(false);
    });
    setShowConfirmationPopup(true);
  };

  const handleEditEntry = (index) => {
    setEditingIndex(index);
    const entry = data[index];
    setNewCategory(entry.category);
    setBlockCount(entry.blocks.length);
    setNewBlocks([...entry.blocks]);
    setNewValues([...entry.values]);
    setIsModalOpen(true);
  };

  const saveEditedEntry = () => {
    if (newCategory.trim() === "") return;

    const updatedData = [...data];
    updatedData[editingIndex] = { category: newCategory, blocks: newBlocks, values: newValues };
    setData(updatedData);
    setEditingIndex(null);
    setIsModalOpen(false);
    setNewCategory("");
    setBlockCount(4);
    setNewBlocks(Array(4).fill("Block"));
    setNewValues(Array(4).fill(0));
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredData([]);
      return;
    }

    const result = data.filter((item) =>
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(result);
  };

  const confirmAction = () => {
    if (confirmationAction) {
      confirmationAction();
    }
  };

  const cancelAction = () => {
    setShowConfirmationPopup(false);
    setConfirmationAction(null);
    setConfirmationMessage("");
  };

  const toggleEditDeleteButtons = () => {
    setShowEditDeleteButtons(!showEditDeleteButtons);
  };

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleEditButtonClick = () => {
    setEditMode(!editMode);
    setDeleteMode(false);
  };

  const handleDeleteButtonClick = () => {
    setDeleteMode(!deleteMode);
    setEditMode(false);
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
      <div className="main-content">
        <header className="top-nav">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </header>

        {/* Action Buttons Container */}
        <div className="action-buttons-container-cs">
          <div>
          <button className="pen-icon-button-cs" onClick={toggleEditDeleteButtons}>
            <AiOutlineEdit size={24} />
          </button>
          </div>
          {showEditDeleteButtons && (
            <div className="action-buttons-cs">
              <button className="add-button-cs" onClick={handleAddButtonClick}>Add New</button>
              <button className="edit-button-cs" onClick={handleEditButtonClick}>
                {editMode ? "Cancel Edit" : "Edit"}
              </button>
              <button className="delete-button-cs" onClick={handleDeleteButtonClick}>
                {deleteMode ? "Cancel Delete" : "Delete"}
              </button>
            </div>
          )}
        </div>

        <main className="content">
          <h2>Computer and Science</h2>

          {data.length === 0 ? (
            <div className="empty-message">No classes added yet.</div>
          ) : (
            <div className="card-container-cs">
              {(filteredData.length === 0 ? data : filteredData).map((item, index) => (
                <div key={index} className="card-cs">
                  {/* Edit and Delete Icons */}
                  {editMode && (
                    <button className="edit-icon-button-cs" onClick={() => handleEditEntry(index)}>
                      ✏
                    </button>
                  )}
                  {deleteMode && (
                    <button className="delete-icon-button-cs" onClick={() => handleDeleteEntry(index)}>
                      🗑
                    </button>
                  )}

                  <h3>{item.category}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Block Name</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.values.map((val, i) => (
                        <tr key={i}>
                          <td>{item.blocks[i]}</td>
                          <td>{val}</td>
                        </tr>
                      ))}
                      <tr>
                        <td>Total</td>
                        <td>{item.values.reduce((a, b) => a + b, 0)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Modal for Adding/Editing Entry */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <FaTimes className="close-icon" onClick={() => setIsModalOpen(false)} />
              <h3>{editingIndex !== null ? "Edit Entry" : "Add New Entry"}</h3>
              <input
                type="text"
                placeholder="Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <label>Number of Blocks:</label>
              <input type="number" min="1" value={blockCount} onChange={handleBlockCountChange} />
              <div className="input-grid">
                {newBlocks.map((block, index) => (
                  <div key={index} className="block-row">
                    <label>Block Name:</label>
                    <input
                      type="text"
                      value={block}
                      onChange={(e) => {
                        const updatedBlocks = [...newBlocks];
                        updatedBlocks[index] = e.target.value;
                        setNewBlocks(updatedBlocks);
                      }}
                    />
                    <label>Value:</label>
                    <input
                      type="number"
                      value={newValues[index]}
                      onChange={(e) => {
                        const updatedValues = [...newValues];
                        updatedValues[index] = parseInt(e.target.value) || 0;
                        setNewValues(updatedValues);
                      }}
                    />
                  </div>
                ))}
              </div>
              <button onClick={editingIndex !== null ? saveEditedEntry : addNewEntry}>
                {editingIndex !== null ? "Save" : "Add"}
              </button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Confirmation Popup */}
        {showConfirmationPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>{confirmationMessage}</h3>
              <button onClick={confirmAction}>Yes</button>
              <button onClick={cancelAction}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Civil;
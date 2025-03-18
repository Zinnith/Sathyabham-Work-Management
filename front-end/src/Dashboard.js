//import React from 'react';
import './Dash.css';
import Logo from './Bama.png';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  // Card data
  const cardData = [
    { label: "Department", count: "1500+" },
    { label: "Rooms", count: "1500+" },
    { label: "Transport", count: "13" },
    { label: "Teaching", count: "15" },
    { label: "Non-Teaching", count: "150" },
  ];

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-wrapper">
          <img src={Logo} alt="logo" className="logo-image" />
        </div>
        <nav className="nav">
          <ul type="none" className='nav-list'>
            <button className='nav-button'><Link to='/stock'>Stock</Link></button>
            <button className='nav-button'><Link to='/services'>Services</Link></button>
            <button className='nav-button'><Link to='/maintenance'>Maintenance</Link></button>
            <button className='nav-button'><Link to='/report'>Report</Link></button>
            <button className='nav-button'><Link to='/profile'>Profile</Link></button>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <div className="Back-Container">
          <div className="overview-cards">
            {cardData.map((item, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <div className="card-number">{item.count}</div>
                  <div className="card-label">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-sections">
          <section className="news-section">
            <h2 className="section-title">News Update</h2>
            <div className="news-list">
              {[ 
                { title: "Water Supply Maintenance", date: "2024-02-15", priority: "High" },
                { title: "IT Infrastructure Update", date: "2024-02-14", priority: "Medium" },
                { title: "Building Renovation", date: "2024-02-13", priority: "Normal" },
              ].map((news, index) => (
                <div key={index} className="news-item">
                  <div>
                    <h3 className="news-title">{news.title}</h3>
                    <p className="news-date">{news.date}</p>
                  </div>
                  {/* Fixed the class name interpolation */}
                  <span className={`priority-badge priority-${news.priority.toLowerCase()}`}>
                    {news.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="ticket-section">
            <h2 className="section-title">Ticket Raising</h2>
            <form className="ticket-form" onSubmit={(e) => { e.preventDefault(); }}>
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
            </form>
          </section>
        </div>
      </main>

      <footer className="footer">
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

export default Dashboard;

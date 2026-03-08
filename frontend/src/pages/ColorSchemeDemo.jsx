import React, { useState } from 'react';

const ColorSchemeDemo = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'resources', label: 'Resources', icon: '📚' },
    { id: 'requests', label: 'Borrow Requests', icon: '📋' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'reports', label: 'Reports', icon: '📊' }
  ];

  const stats = [
    { label: 'Total Resources', value: '120', icon: '📚' },
    { label: 'Borrowed', value: '35', icon: '📦' },
    { label: 'Available', value: '85', icon: '✅' },
    { label: 'Pending', value: '12', icon: '⏳' }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">🎓 Resource System</div>
        {menuItems.map(item => (
          <a 
            key={item.id}
            href="#"
            className={activeMenu === item.id ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu(item.id);
            }}
          >
            <span className="menu-icon">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </div>

      {/* Main Content */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <h2>Dashboard</h2>
          <input 
            className="search" 
            placeholder="Search resources..."
          />
        </div>

        {/* Stats Cards */}
        <div className="cards">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="card-icon">
                {stat.icon}
              </div>
              <h3>{stat.label}</h3>
              <p>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Sample Table */}
        <div className="table-container">
          <h3>Recent Activity</h3>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Resource</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>Laptop</td>
                <td><span className="badge badge-borrowed">Borrowed</span></td>
                <td><button className="btn btn-primary">View</button></td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>Projector</td>
                <td><span className="badge badge-available">Available</span></td>
                <td><button className="btn btn-primary">Approve</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .menu-icon {
          margin-right: 10px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default ColorSchemeDemo;

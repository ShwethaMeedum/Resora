import React, { useState } from 'react';

const EnhancedDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const stats = {
    totalResources: 120,
    borrowed: 35,
    available: 85,
    pendingRequests: 12
  };

  const recentRequests = [
    {
      id: 1,
      student: 'John Silva',
      resource: 'Laptop',
      status: 'borrowed',
      action: 'View'
    },
    {
      id: 2,
      student: 'Nimal Perera',
      resource: 'Projector',
      status: 'available',
      action: 'Approve'
    },
    {
      id: 3,
      student: 'Sarah Johnson',
      resource: 'Textbook',
      status: 'pending',
      action: 'Review'
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard">
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          🎓 Resource System
        </div>
        <a href="#" className="active">
          <i className="fa-solid fa-home"></i>
          Dashboard
        </a>
        <a href="#">
          <i className="fa-solid fa-book"></i>
          Resources
        </a>
        <a href="#">
          <i className="fa-solid fa-clipboard-list"></i>
          Borrow Requests
        </a>
        <a href="#">
          <i className="fa-solid fa-users"></i>
          Users
        </a>
        <a href="#">
          <i className="fa-solid fa-chart-bar"></i>
          Reports
        </a>
      </div>

      {/* Main Content */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <h2>Dashboard</h2>
          <div className="search-container">
            <input 
              className="search" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fa-solid fa-search search-icon"></i>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="cards">
          <div className="card">
            <h3>
              <i className="fa-solid fa-book"></i>
              Total Resources
            </h3>
            <p>{stats.totalResources}</p>
          </div>
          
          <div className="card">
            <h3>
              <i className="fa-solid fa-hand-holding"></i>
              Borrowed
            </h3>
            <p>{stats.borrowed}</p>
          </div>
          
          <div className="card">
            <h3>
              <i className="fa-solid fa-check-circle"></i>
              Available
            </h3>
            <p>{stats.available}</p>
          </div>
          
          <div className="card">
            <h3>
              <i className="fa-solid fa-clock"></i>
              Pending Requests
            </h3>
            <p>{stats.pendingRequests}</p>
          </div>
        </div>

        {/* Recent Requests Table */}
        <div className="table-container">
          <h3>Recent Borrow Requests</h3>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Resource</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div className="student-info">
                      <i className="fa-solid fa-user-circle"></i>
                      {request.student}
                    </div>
                  </td>
                  <td>
                    <div className="resource-info">
                      <i className="fa-solid fa-laptop"></i>
                      {request.resource}
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${request.status}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-primary">
                      {request.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .mobile-menu-toggle {
          display: none;
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1001;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px;
          cursor: pointer;
          font-size: 18px;
        }

        .search-container {
          position: relative;
        }

        .search-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .student-info,
        .resource-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card h3 {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 900px) {
          .mobile-menu-toggle {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedDashboard;

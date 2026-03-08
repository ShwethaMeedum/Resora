import React, { useState } from 'react';

const MobileMenu = ({ isOpen, onClose, user, onLogout, navigation }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'mobile-menu-open' : ''}`}>
        {/* Header */}
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">
            <span>🎓</span>
            <span>Academic Hub</span>
          </div>
          <button 
            onClick={onClose}
            className="mobile-menu-close"
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        <div className="mobile-menu-user">
          <div className="mobile-user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div className="mobile-user-info">
            <div className="mobile-user-name">{user?.name}</div>
            <div className="mobile-user-role">{user?.role}</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mobile-menu-nav">
          {navigation.map((item) => (
            <div key={item.key} className="mobile-nav-section">
              {item.submenu ? (
                <>
                  <button
                    className="mobile-nav-item mobile-nav-toggle"
                    onClick={() => toggleSection(item.key)}
                  >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-text">{item.label}</span>
                    <span className={`mobile-nav-chevron ${expandedSections[item.key] ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <div className={`mobile-nav-submenu ${expandedSections[item.key] ? 'expanded' : ''}`}>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.key}
                        to={subItem.href}
                        className="mobile-nav-subitem"
                        onClick={onClose}
                      >
                        <span className="mobile-nav-icon">{subItem.icon}</span>
                        <span className="mobile-nav-text">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.href}
                  className="mobile-nav-item"
                  onClick={onClose}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  <span className="mobile-nav-text">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="mobile-menu-footer">
          <button 
            onClick={onLogout}
            className="mobile-menu-logout"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: var(--z-modal-backdrop);
          opacity: 0;
          animation: fadeIn var(--transition-normal);
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          background: var(--bg-secondary);
          box-shadow: var(--shadow-2xl);
          z-index: var(--z-modal);
          transform: translateX(-100%);
          transition: transform var(--transition-normal);
          display: flex;
          flex-direction: column;
        }

        .mobile-menu-open {
          transform: translateX(0);
        }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-4);
          border-bottom: 1px solid var(--gray-200);
          background: var(--bg-tertiary);
        }

        .mobile-menu-logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--primary-color);
        }

        .mobile-menu-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: var(--font-size-lg);
          cursor: pointer;
          border-radius: var(--radius-md);
          transition: all var(--transition-normal);
        }

        .mobile-menu-close:hover {
          background: var(--gray-100);
          color: var(--text-primary);
        }

        .mobile-menu-user {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          padding: var(--spacing-4);
          border-bottom: 1px solid var(--gray-200);
        }

        .mobile-user-avatar {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-full);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-inverse);
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-lg);
        }

        .mobile-user-info {
          flex: 1;
        }

        .mobile-user-name {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-1);
        }

        .mobile-user-role {
          font-size: var(--font-size-sm);
          color: var(--text-tertiary);
          text-transform: capitalize;
        }

        .mobile-menu-nav {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-2);
        }

        .mobile-nav-section {
          margin-bottom: var(--spacing-1);
        }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          padding: var(--spacing-3) var(--spacing-4);
          border-radius: var(--radius-lg);
          color: var(--text-primary);
          text-decoration: none;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          transition: all var(--transition-normal);
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }

        .mobile-nav-item:hover {
          background: var(--bg-tertiary);
          color: var(--primary-color);
        }

        .mobile-nav-toggle {
          justify-content: space-between;
        }

        .mobile-nav-icon {
          font-size: var(--font-size-lg);
          width: 24px;
          text-align: center;
        }

        .mobile-nav-text {
          flex: 1;
        }

        .mobile-nav-chevron {
          font-size: var(--font-size-xs);
          transition: transform var(--transition-normal);
        }

        .mobile-nav-chevron.expanded {
          transform: rotate(180deg);
        }

        .mobile-nav-submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height var(--transition-normal);
          margin-left: var(--spacing-6);
        }

        .mobile-nav-submenu.expanded {
          max-height: 300px;
        }

        .mobile-nav-subitem {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          padding: var(--spacing-2) var(--spacing-3);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          text-decoration: none;
          font-size: var(--font-size-sm);
          transition: all var(--transition-normal);
        }

        .mobile-nav-subitem:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .mobile-nav-subitem .mobile-nav-icon {
          font-size: var(--font-size-base);
          width: 20px;
        }

        .mobile-menu-footer {
          padding: var(--spacing-4);
          border-top: 1px solid var(--gray-200);
        }

        .mobile-menu-logout {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          width: 100%;
          padding: var(--spacing-3);
          border: 1px solid var(--error-color);
          background: transparent;
          color: var(--error-color);
          border-radius: var(--radius-lg);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .mobile-menu-logout:hover {
          background: var(--error-lightest);
        }

        @media (max-width: 640px) {
          .mobile-menu {
            width: 100%;
          }
        }

        @media (min-width: 1025px) {
          .mobile-menu,
          .mobile-menu-overlay {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default MobileMenu;

import React from 'react';

const TestPremium = () => {
  return (
    <div className="premium-container">
      <div className="premium-card">
        <div className="premium-card-header">
          <h1 className="premium-card-title">🎓 Premium CSS Test</h1>
          <p className="premium-card-subtitle">
            Testing premium design system
          </p>
        </div>

        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">🎨 Premium Elements</h2>
          </div>
          
          <div className="premium-stats-grid">
            <div className="premium-stat-card">
              <div className="premium-stat-icon">🎯</div>
              <div className="premium-stat-value">100%</div>
              <div className="premium-stat-label">Working</div>
            </div>
            <div className="premium-stat-card">
              <div className="premium-stat-icon">✨</div>
              <div className="premium-stat-value">Premium</div>
              <div className="premium-stat-label">Design</div>
            </div>
          </div>
        </div>

        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">🎨 Buttons</h2>
          </div>
          
          <div className="premium-flex premium-gap-md">
            <button className="premium-button premium-button-primary">
              🚀 Primary Button
            </button>
            <button className="premium-button premium-button-success">
              ✅ Success Button
            </button>
            <button className="premium-button premium-button-warning">
              ⚠️ Warning Button
            </button>
            <button className="premium-button premium-button-error">
              ❌ Error Button
            </button>
          </div>
        </div>

        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">📝 Forms</h2>
          </div>
          
          <div className="premium-form-group">
            <label className="premium-form-label">Test Input</label>
            <input
              type="text"
              placeholder="Type something..."
              className="premium-form-input"
            />
          </div>
          
          <div className="premium-form-group">
            <label className="premium-form-label">Test Select</label>
            <select className="premium-form-select">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>

        <div className="premium-section">
          <div className="premium-section-header">
            <h2 className="premium-section-title">🏷️ Badges</h2>
          </div>
          
          <div className="premium-flex premium-gap-md">
            <span className="premium-badge premium-badge-success">✅ Success</span>
            <span className="premium-badge premium-badge-warning">⚠️ Warning</span>
            <span className="premium-badge premium-badge-error">❌ Error</span>
            <span className="premium-badge premium-badge-info">ℹ️ Info</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPremium;

import React from 'react';

const SimplePremiumTest = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      padding: '2rem',
      fontFamily: 'var(--font-family)'
    }}>
      <div style={{
        background: 'var(--bg-primary)',
        padding: '2rem',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'var(--font-size-3xl)',
          fontWeight: '700',
          color: 'var(--primary-color)',
          marginBottom: '1rem'
        }}>
          Premium CSS Test
        </h1>
        
        <p style={{
          fontSize: 'var(--font-size-md)',
          color: 'var(--text-secondary)',
          marginBottom: '2rem'
        }}>
          If you can see this styled properly, the premium CSS is working!
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'var(--gradient-primary)',
            color: 'var(--text-inverse)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            fontSize: 'var(--font-size-md)',
            fontWeight: '600',
            boxShadow: 'var(--shadow-md)',
            transition: 'var(--transition-normal)',
            cursor: 'pointer'
          }}>
            Primary Button
          </div>
          
          <div style={{
            background: 'var(--gradient-success)',
            color: 'var(--text-inverse)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            fontSize: 'var(--font-size-md)',
            fontWeight: '600',
            boxShadow: 'var(--shadow-md)',
            transition: 'var(--transition-normal)',
            cursor: 'pointer'
          }}>
            Success Button
          </div>
          
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--primary-color)',
            fontSize: 'var(--font-size-md)',
            fontWeight: '600',
            color: 'var(--text-primary)',
            transition: 'var(--transition-normal)'
          }}>
            Input Field
          </div>
        </div>
        
        <div style={{
          background: 'var(--bg-tertiary)',
          padding: '1rem',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: '700',
            color: 'var(--primary-color)',
            marginBottom: '0.5rem'
          }}>
            CSS Variables Test
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Primary Color: <span style={{ color: 'var(--primary-color)', fontWeight: '600' }}>var(--primary-color)</span>
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Background: <span style={{ color: 'var(--bg-secondary)', fontWeight: '600' }}>var(--bg-secondary)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimplePremiumTest;

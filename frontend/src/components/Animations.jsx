import React from 'react';

// Loading Spinner Component
const LoadingSpinner = ({ size = 'medium', color = 'primary', className = '' }) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large',
    xlarge: 'spinner-xlarge'
  };

  const colorClasses = {
    primary: 'spinner-primary',
    secondary: 'spinner-secondary',
    success: 'spinner-success',
    warning: 'spinner-warning',
    error: 'spinner-error',
    white: 'spinner-white'
  };

  return (
    <div className={`spinner ${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      <style jsx>{`
        .spinner {
          display: inline-block;
          border-radius: 50%;
          border: 2px solid transparent;
          animation: spin 1s linear infinite;
        }

        .spinner-small {
          width: 16px;
          height: 16px;
          border-width: 2px;
        }

        .spinner-medium {
          width: 24px;
          height: 24px;
          border-width: 3px;
        }

        .spinner-large {
          width: 32px;
          height: 32px;
          border-width: 3px;
        }

        .spinner-xlarge {
          width: 48px;
          height: 48px;
          border-width: 4px;
        }

        .spinner-primary {
          border-top-color: var(--primary-color);
        }

        .spinner-secondary {
          border-top-color: var(--text-secondary);
        }

        .spinner-success {
          border-top-color: var(--success-color);
        }

        .spinner-warning {
          border-top-color: var(--warning-color);
        }

        .spinner-error {
          border-top-color: var(--error-color);
        }

        .spinner-white {
          border-top-color: var(--text-inverse);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Skeleton Loader Component
const SkeletonLoader = ({ 
  lines = 3, 
  height = 'medium', 
  width = '100%', 
  className = '' 
}) => {
  const heightClasses = {
    small: 'skeleton-small',
    medium: 'skeleton-medium',
    large: 'skeleton-large'
  };

  return (
    <div className={`skeleton-loader ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`skeleton ${heightClasses[height]}`}
          style={{ 
            width: Array.isArray(width) ? width[index] || '100%' : width,
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
      
      <style jsx>{`
        .skeleton-loader {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }

        .skeleton {
          background: linear-gradient(90deg, var(--gray-200) 25%, var(--gray-300) 50%, var(--gray-200) 75%);
          background-size: 200% 100%;
          border-radius: var(--radius-md);
          animation: shimmer 1.5s infinite;
        }

        .skeleton-small {
          height: 16px;
        }

        .skeleton-medium {
          height: 24px;
        }

        .skeleton-large {
          height: 32px;
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  color = 'primary', 
  size = 'medium',
  showLabel = false,
  animated = true,
  className = '' 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    small: 'progress-small',
    medium: 'progress-medium',
    large: 'progress-large'
  };

  const colorClasses = {
    primary: 'progress-primary',
    secondary: 'progress-secondary',
    success: 'progress-success',
    warning: 'progress-warning',
    error: 'progress-error'
  };

  return (
    <div className={`progress-container ${sizeClasses[size]} ${className}`}>
      {showLabel && (
        <span className="progress-label">{Math.round(percentage)}%</span>
      )}
      <div className="progress-bar">
        <div
          className={`progress-fill ${colorClasses[color]} ${animated ? 'progress-animated' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <style jsx>{`
        .progress-container {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }

        .progress-small {
          font-size: var(--font-size-sm);
        }

        .progress-medium {
          font-size: var(--font-size-base);
        }

        .progress-large {
          font-size: var(--font-size-lg);
        }

        .progress-label {
          font-weight: var(--font-weight-medium);
          color: var(--text-secondary);
          min-width: 40px;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: var(--gray-200);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-small .progress-bar {
          height: 6px;
        }

        .progress-large .progress-bar {
          height: 12px;
        }

        .progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width var(--transition-normal);
        }

        .progress-primary {
          background: var(--gradient-primary);
        }

        .progress-secondary {
          background: var(--gradient-secondary);
        }

        .progress-success {
          background: var(--gradient-success);
        }

        .progress-warning {
          background: var(--gradient-warning);
        }

        .progress-error {
          background: var(--gradient-error);
        }

        .progress-animated {
          background-size: 100% 100%;
          background-image: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: progress-shimmer 2s infinite;
        }

        @keyframes progress-shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>
    </div>
  );
};

// Pulse Animation Component
const Pulse = ({ 
  children, 
  className = '', 
  color = 'primary',
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'pulse-small',
    medium: 'pulse-medium',
    large: 'pulse-large'
  };

  const colorClasses = {
    primary: 'pulse-primary',
    secondary: 'pulse-secondary',
    success: 'pulse-success',
    warning: 'pulse-warning',
    error: 'pulse-error'
  };

  return (
    <div className={`pulse ${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      {children}
      
      <style jsx>{`
        .pulse {
          position: relative;
          display: inline-block;
        }

        .pulse::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          animation: pulse-animation 2s infinite;
        }

        .pulse-small::after {
          margin: -2px;
        }

        .pulse-medium::after {
          margin: -4px;
        }

        .pulse-large::after {
          margin: -6px;
        }

        .pulse-primary::after {
          border: 2px solid var(--primary-color);
        }

        .pulse-secondary::after {
          border: 2px solid var(--secondary-color);
        }

        .pulse-success::after {
          border: 2px solid var(--success-color);
        }

        .pulse-warning::after {
          border: 2px solid var(--warning-color);
        }

        .pulse-error::after {
          border: 2px solid var(--error-color);
        }

        @keyframes pulse-animation {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Bounce Animation Component
const Bounce = ({ children, className = '', delay = 0 }) => {
  return (
    <div className={`bounce ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
      
      <style jsx>{`
        .bounce {
          animation: bounce-animation 1s ease-in-out infinite;
        }

        @keyframes bounce-animation {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
      `}</style>
    </div>
  );
};

// Fade In Animation Component
const FadeIn = ({ 
  children, 
  direction = 'up', 
  duration = 'normal', 
  delay = 0,
  className = '' 
}) => {
  const directionClasses = {
    up: 'fade-in-up',
    down: 'fade-in-down',
    left: 'fade-in-left',
    right: 'fade-in-right'
  };

  const durationClasses = {
    fast: 'fade-fast',
    normal: 'fade-normal',
    slow: 'fade-slow'
  };

  return (
    <div 
      className={`fade ${directionClasses[direction]} ${durationClasses[duration]} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
      
      <style jsx>{`
        .fade {
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .fade-in-up {
          transform: translateY(20px);
          animation-name: fade-in-up-animation;
        }

        .fade-in-down {
          transform: translateY(-20px);
          animation-name: fade-in-down-animation;
        }

        .fade-in-left {
          transform: translateX(-20px);
          animation-name: fade-in-left-animation;
        }

        .fade-in-right {
          transform: translateX(20px);
          animation-name: fade-in-right-animation;
        }

        .fade-fast {
          animation-duration: 0.3s;
        }

        .fade-normal {
          animation-duration: 0.5s;
        }

        .fade-slow {
          animation-duration: 0.8s;
        }

        @keyframes fade-in-up-animation {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-down-animation {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left-animation {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right-animation {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

// Scale In Animation Component
const ScaleIn = ({ children, delay = 0, className = '' }) => {
  return (
    <div 
      className={`scale-in ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
      
      <style jsx>{`
        .scale-in {
          opacity: 0;
          transform: scale(0.9);
          animation: scale-in-animation 0.3s ease-out forwards;
        }

        @keyframes scale-in-animation {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// Hover Card Component
const HoverCard = ({ 
  children, 
  lift = true, 
  glow = false, 
  className = '' 
}) => {
  return (
    <div className={`hover-card ${lift ? 'hover-lift' : ''} ${glow ? 'hover-glow' : ''} ${className}`}>
      {children}
      
      <style jsx>{`
        .hover-card {
          transition: all var(--transition-normal);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.2);
        }

        .hover-lift.hover-glow:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 40px rgba(37, 99, 235, 0.3);
        }
      `}</style>
    </div>
  );
};

// Tooltip Component
const Tooltip = ({ 
  children, 
  content, 
  position = 'top', 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div 
      className={`tooltip-container ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`tooltip tooltip-${position}`}>
          {content}
          <div className={`tooltip-arrow tooltip-arrow-${position}`}></div>
        </div>
      )}
      
      <style jsx>{`
        .tooltip-container {
          position: relative;
          display: inline-block;
        }

        .tooltip {
          position: absolute;
          z-index: var(--z-tooltip);
          background: var(--gray-800);
          color: var(--text-inverse);
          padding: var(--spacing-2) var(--spacing-3);
          border-radius: var(--radius-md);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          white-space: nowrap;
          pointer-events: none;
          animation: tooltip-fade-in var(--transition-fast);
        }

        .tooltip-top {
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
        }

        .tooltip-bottom {
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
        }

        .tooltip-left {
          right: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
        }

        .tooltip-right {
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
        }

        .tooltip-arrow {
          position: absolute;
          width: 0;
          height: 0;
          border: 4px solid transparent;
        }

        .tooltip-arrow-top {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-top-color: var(--gray-800);
        }

        .tooltip-arrow-bottom {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-bottom-color: var(--gray-800);
        }

        .tooltip-arrow-left {
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-left-color: var(--gray-800);
        }

        .tooltip-arrow-right {
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-right-color: var(--gray-800);
        }

        @keyframes tooltip-fade-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-2px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export {
  LoadingSpinner,
  SkeletonLoader,
  ProgressBar,
  Pulse,
  Bounce,
  FadeIn,
  ScaleIn,
  HoverCard,
  Tooltip
};

import React from 'react';

interface ProgressBarProps {
  value: number; // Between 0 and 100
  height?: string;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  height = '10px',
  color = '#4caf50',
  backgroundColor = '#e0e0e0',
  showLabel = false,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      style={{
        backgroundColor,
        borderRadius: '6px',
        height,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${clampedValue}%`,
          backgroundColor: color,
          height: '100%',
          transition: 'width 0.3s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '0.8rem',
        }}
      >
        {showLabel}
      </div>
    </div>
  );
};

export default ProgressBar;

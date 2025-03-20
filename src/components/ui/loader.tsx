// SwingDots.tsx
import React from 'react';
import './PulseLoader.css';

interface SwingDotsProps {
  size?: string;
  color?: string;
  speed?: string;
}

const SwingDots : React.FC<SwingDotsProps> = ({
  size = '40px',
  color = 'black',
  speed = '1.6s',
}) => {
  return (
    <div
      className="container"
      style={
        {
          '--uib-size': size,
          '--uib-color': color,
          '--uib-speed': speed,
        } as React.CSSProperties
      }
    >
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export default SwingDots ;

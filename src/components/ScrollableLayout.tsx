import React from 'react';

interface ScrollableLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollableLayout: React.FC<ScrollableLayoutProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`flex-1 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};

export default ScrollableLayout;
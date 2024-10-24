import React from 'react';

const Card = React.forwardRef(({ 
  children, 
  className = '', 
  onClick, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        bg-white 
        rounded-lg 
        shadow-sm
        transition-all 
        duration-200 
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
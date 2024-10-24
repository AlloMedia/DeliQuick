import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  isLoading = false,
  onClick,
  className = "btn-auth",
  ...props
}) => {
  const baseClasses = "rounded-md focus:outline-none transition-all duration-200";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 focus:bg-gray-600",
    secondary: "bg-[#E0E0E0] text-gray-800 hover:bg-gray-300 focus:bg-gray-400",
    outline: "border-2 border-black text-black hover:bg-black hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:bg-red-800",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-3",
    lg: "px-4 py-3 text-lg",
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
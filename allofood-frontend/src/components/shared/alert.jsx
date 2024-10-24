import React from "react";

export const Alert = ({ children, variant = "default" }) => {
  const variantClasses = {
    default: "bg-blue-100 text-blue-700",
    warning: "bg-yellow-100 text-yellow-700",
    destructive: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
  };
  
  return (
    <div className={`p-4 rounded-md ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return <p className="text-sm">{children}</p>;
};
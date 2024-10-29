import React from "react";

const Input = ({
    type = "text",
    name,
    label,
    value,
    onChange,
    onBlur,
    required = false,
    disabled = false,
    className = "",
    error = "",
    ...props
}) => {
    return (
        <div className="relative mt-6">
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                disabled={disabled}
                placeholder={label}
                className={`peer mt-1 w-full border-b-2 ${
                    error ? 'border-red-500' : 'border-gray-300'
                } px-0 py-1 placeholder:text-transparent focus:border-gray-500 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                autoComplete="off"
                {...props}
            />
            <label
                htmlFor={name}
                className={`pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform ${
                    error ? 'pb-5 peer-focus:pb-0 text-red-500' : 'text-gray-800'
                } opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0`}
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};

export default Input;
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
}

export const Button = ({ children, isActive, className = '', ...props }: ButtonProps) => {
    return (
        <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
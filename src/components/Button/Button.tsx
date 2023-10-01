import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

const Button = ({ buttonText, className, ...props }: ButtonProps) => (
  <button className={`text-slate-50 py-4 px-6 font-medium rounded-xl bg-primary text-center border border-transparent transition duration-200 hover:text-primary hover:bg-transparent hover:border-primary ${className}`} {...props}>{buttonText}</button>
);

export default Button;

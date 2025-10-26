import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost';
};

export default function Button({ children, className = '', variant = 'default', ...props }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md focus:outline-none';
  const variants: Record<string, string> = {
    default: 'bg-black text-white hover:bg-slate-800',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800',
  };
  return (
    <button {...props} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

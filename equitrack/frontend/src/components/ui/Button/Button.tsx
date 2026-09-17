// frontend/src/components/ui/Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'white' | 'third';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    className = '',
    ...props
}) => {
    const buttonClasses = [
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};
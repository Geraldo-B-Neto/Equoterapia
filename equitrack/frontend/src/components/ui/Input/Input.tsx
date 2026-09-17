// src/components/ui/Input/Input.tsx
import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    fullWidth = true,
    className = '',
    id,
    ...props
}) => {
    return (
        <article className={styles.boxInputs}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                className={`${styles.input} ${fullWidth ? styles.fullWidth : ''} ${className}`}
                {...props}
            />
        </article>
    );
};
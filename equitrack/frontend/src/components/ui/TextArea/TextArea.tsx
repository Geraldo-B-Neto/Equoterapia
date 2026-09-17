// src/components/ui/TextArea/TextArea.tsx
import React from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    fullWidth?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
    label,
    fullWidth = true,
    className = '',
    id,
    ...props
}) => {
    return (
        <article className={styles.boxInputs}>
            {label && <label htmlFor={id}>{label}</label>}
            <textarea
                id={id}
                className={`${styles.textarea} ${fullWidth ? styles.fullWidth : ''} ${className}`}
                {...props}
            />
        </article>
    );
};
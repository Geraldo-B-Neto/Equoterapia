// src/components/ui/Divider/Divider.tsx
import React from 'react';
import styles from './Divider.module.css';

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: 'large' | 'medium' | 'small';
    backgroundColor?: 'corVerdeEscuro' | 'corBranca' | 'corDourada';
}

export const Divider: React.FC<DividerProps> = ({
    width = 'large',
    backgroundColor = 'corVerdeEscuro',
    className = '',
    ...props
}) => {
    const dividerClasses = [
        styles.divider,
        styles[width],
        styles[backgroundColor],
        className,
    ].filter(Boolean).join(' ');

    return <div className={dividerClasses} {...props} />;
};
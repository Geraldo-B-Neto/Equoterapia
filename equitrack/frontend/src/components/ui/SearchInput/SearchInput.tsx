import React from 'react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Buscar...',
  onChange,
  value,
}) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};
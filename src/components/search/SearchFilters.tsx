'use client';

import React from 'react';

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const roastingStyles = [
    'Light',
    'Medium',
    'Dark',
    'Espresso',
    'Single Origin'
  ];

  const handleStyleChange = (style: string) => {
    // Basic filter implementation for MVP
    onFilterChange({ style });
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-4">Roasting Styles</h3>
      <div className="space-y-2">
        {roastingStyles.map((style) => (
          <label key={style} className="flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={() => handleStyleChange(style)}
              className="rounded border-gray-300 text-brown-600 focus:ring-brown-500"
            />
            <span>{style}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
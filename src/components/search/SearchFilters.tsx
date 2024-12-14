'use client';

import { useState, useEffect } from 'react';
import { SearchFiltersType } from './SearchContainer';

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFiltersType) => void;
  initialFilters?: SearchFiltersType;
}

export function SearchFilters({ onFilterChange, initialFilters }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFiltersType>(initialFilters || {});

  const roastingStyles = [
    'Light',
    'Medium',
    'Dark',
    'Espresso',
    'Single Origin'
  ];

  const states = [
    'CA', 'NY', 'WA', 'OR', 'TX', // Add more as needed
  ];

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const handleStyleChange = (style: string) => {
    const currentStyles = filters.roastingStyles || [];
    const newStyles = currentStyles.includes(style)
      ? currentStyles.filter(s => s !== style)
      : [...currentStyles, style];

    const newFilters = {
      ...filters,
      roastingStyles: newStyles
    };

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...filters,
      state: e.target.value || undefined
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-white shadow-sm">
      <div>
        <h3 className="font-semibold mb-3">Roasting Styles</h3>
        <div className="space-y-2">
          {roastingStyles.map((style) => (
            <label key={style} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.roastingStyles?.includes(style) || false}
                onChange={() => handleStyleChange(style)}
                className="rounded border-gray-300 text-brown-600 focus:ring-brown-500"
              />
              <span>{style}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Location</h3>
        <select
          value={filters.state || ''}
          onChange={handleStateChange}
          className="w-full rounded-md border-gray-300 focus:border-brown-300 focus:ring focus:ring-brown-200"
        >
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
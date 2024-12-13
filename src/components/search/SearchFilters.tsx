'use client';

import { useState } from 'react';
import { z } from 'zod';

const filterSchema = z.object({
  roastingStyles: z.array(z.string()).optional(),
  location: z.object({
    city: z.string().optional(),
    state: z.string().length(2, 'State must be a 2-letter code').optional()
  }).optional()
});

type Filters = z.infer<typeof filterSchema>;

interface SearchFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({ roastingStyles: [] });
  const [error, setError] = useState<string>();

  const roastingStyles = [
    'Light',
    'Medium',
    'Dark',
    'Espresso',
    'Single Origin'
  ];

  const handleStyleChange = (style: string) => {
    try {
      const updatedStyles = filters.roastingStyles?.includes(style)
        ? filters.roastingStyles.filter(s => s !== style)
        : [...(filters.roastingStyles || []), style];

      const newFilters = {
        ...filters,
        roastingStyles: updatedStyles
      };

      const validated = filterSchema.parse(newFilters);
      setFilters(validated);
      setError(undefined);
      onFilterChange(validated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-4">Roasting Styles</h3>
      <div className="space-y-2">
        {roastingStyles.map((style) => (
          <label key={style} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.roastingStyles?.includes(style)}
              onChange={() => handleStyleChange(style)}
              className="rounded border-gray-300 text-brown-600 focus:ring-brown-500"
            />
            <span>{style}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>
      )}
    </div>
  );
};
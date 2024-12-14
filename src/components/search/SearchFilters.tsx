'use client';

import { useState, useEffect } from 'react';
import { SearchFiltersType } from './SearchContainer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    'CA', 'NY', 'WA', 'OR', 'TX',
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

  const handleStateChange = (value: string) => {
    const newFilters = {
      ...filters,
      state: value || undefined
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Roasting Styles</h3>
          <div className="space-y-2">
            {roastingStyles.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={style}
                  checked={filters.roastingStyles?.includes(style) || false}
                  onCheckedChange={() => handleStyleChange(style)}
                />
                <label
                  htmlFor={style}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {style}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Location</h3>
          <Select
            value={filters.state}
            onValueChange={handleStateChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
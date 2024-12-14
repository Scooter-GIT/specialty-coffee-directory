'use client';

import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { SearchFilters } from './SearchFilters';
import { useRouter, useSearchParams } from 'next/navigation';

export type SearchFiltersType = {
  roastingStyles?: string[];
  city?: string;
  state?: string;
};

export function SearchContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<SearchFiltersType>({});

  const handleSearch = (query: string) => {
    // Create a new URLSearchParams object with all current parameters
    const params = new URLSearchParams();
    
    // Add search query if exists
    if (query) {
      params.set('q', query);
    }
    
    // Add filters
    if (filters.roastingStyles?.length) {
      params.set('roastingStyles', filters.roastingStyles.join(','));
    }
    if (filters.state) {
      params.set('state', filters.state);
    }
    if (filters.city) {
      params.set('city', filters.city);
    }

    // Navigate with new params
    router.push(`/roasters?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
    // Get current search query
    const currentQuery = searchParams.get('q') || '';
    // Trigger search with current query and new filters
    handleSearch(currentQuery);
  };

  return (
    <div className="space-y-6">
      <SearchBar 
        onSearch={handleSearch}
        initialQuery={searchParams.get('q') || ''}
      />
      <SearchFilters 
        onFilterChange={handleFilterChange}
        initialFilters={{
          roastingStyles: searchParams.get('roastingStyles')?.split(',').filter(Boolean) || [],
          city: searchParams.get('city') || undefined,
          state: searchParams.get('state') || undefined
        }}
      />
    </div>
  );
}
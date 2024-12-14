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
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    
    // Add filters to URL
    Object.entries(filters).forEach(([key, value]) => {
      if (value && (typeof value === 'string' || value.length > 0)) {
        params.set(key, Array.isArray(value) ? value.join(',') : value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/roasters?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
    // Trigger search with new filters
    const query = searchParams.get('q') || '';
    handleSearch(query);
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
          roastingStyles: searchParams.get('roastingStyles')?.split(',') || [],
          city: searchParams.get('city') || undefined,
          state: searchParams.get('state') || undefined
        }}
      />
    </div>
  );
}
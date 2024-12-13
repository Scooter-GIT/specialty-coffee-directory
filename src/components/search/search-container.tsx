'use client';

import { useState } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { SearchBar } from './SearchBar';
import { SearchFilters } from './SearchFilters';
import { searchQuerySchema } from '@/lib/validations/roaster';

interface SearchContainerProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

export function SearchContainer({ onSearch, onFilterChange }: SearchContainerProps) {
  const [error, setError] = useState<string>();

  const handleSearch = async (query: string) => {
    try {
      const validated = searchQuerySchema.parse({ query });
      setError(undefined);
      onSearch(validated.query || '');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <ErrorBoundary
        fallback={
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-red-600">Search is temporarily unavailable</p>
          </div>
        }
      >
        <SearchBar onSearch={handleSearch} />
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </ErrorBoundary>

      <ErrorBoundary>
        <SearchFilters onFilterChange={onFilterChange} />
      </ErrorBoundary>
    </div>
  );
}
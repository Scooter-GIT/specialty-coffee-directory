'use client';

import { useState } from 'react';
import { z } from 'zod';

const searchInputSchema = z.object({
  query: z.string()
    .min(2, 'Search term must be at least 2 characters')
    .max(50, 'Search term must not exceed 50 characters')
    .refine(val => !/^\s*$/.test(val), 'Search term cannot be empty')
});

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = searchInputSchema.parse({ query });
      setError(undefined);
      onSearch(validated.query);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError(undefined);
          }}
          placeholder="Search for coffee roasters..."
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brown-300 focus:border-brown-300
            ${error ? 'border-red-300 focus:ring-red-200 focus:border-red-300' : ''}`}
          aria-invalid={error ? 'true' : 'false'}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-brown-600 text-white rounded-md hover:bg-brown-700"
        >
          Search
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>
      )}
    </form>
  );
};
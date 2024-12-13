'use client';

import React from 'react';
import { SearchBar } from './SearchBar';

export const SearchContainer = () => {
  const handleSearch = (query: string) => {
    // Handle search logic here
    console.log('Searching for:', query);
  };

  return <SearchBar onSearch={handleSearch} />;
};
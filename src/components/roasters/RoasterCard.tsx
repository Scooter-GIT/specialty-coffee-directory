import React from 'react';
import { type Roaster } from '@prisma/client';

interface RoasterCardProps {
  roaster: Roaster;
}

export const RoasterCard: React.FC<RoasterCardProps> = ({ roaster }) => {
  return (
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{roaster.name}</h2>
      <p className="text-gray-600 mb-2">{roaster.city}, {roaster.state}</p>
      {roaster.description && (
        <p className="text-gray-700 mb-4">{roaster.description}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {roaster.roastingStyles.map((style) => (
          <span key={style} className="px-2 py-1 bg-brown-100 text-brown-800 rounded-full text-sm">
            {style}
          </span>
        ))}
      </div>
    </div>
  );
};
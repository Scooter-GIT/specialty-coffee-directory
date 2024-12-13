import { prisma } from '@/lib/prisma';
import { RoasterList } from '@/components/roasters/RoasterList';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchFilters } from '@/components/search/SearchFilters';

export default async function RoastersPage() {
  const roasters = await prisma.roaster.findMany({
    orderBy: { name: 'asc' },
    take: 20
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Coffee Roasters</h1>
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <SearchFilters onFilterChange={() => {}} />
        </div>
        
        <div className="md:col-span-3">
          <div className="mb-6">
            <SearchBar onSearch={() => {}} />
          </div>
          <RoasterList roasters={roasters} />
        </div>
      </div>
    </main>
  );
}
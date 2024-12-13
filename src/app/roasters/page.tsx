import { prisma } from '@/lib/prisma';
import { RoasterList } from '@/components/roasters/RoasterList';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchFilters } from '@/components/search/SearchFilters';

export const dynamic = 'force-dynamic';

export default async function RoastersPage() {
  try {
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
  } catch (error) {
    console.error('Error fetching roasters:', error);
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Coffee Roasters</h1>
        <p className="text-center text-gray-600">Unable to load roasters at this time.</p>
      </main>
    );
  }
}
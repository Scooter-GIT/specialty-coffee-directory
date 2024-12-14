import { prisma } from '@/lib/prisma';
import { RoasterList } from '@/components/roasters/RoasterList';
import { SearchContainer } from '@/components/search/SearchContainer';

interface RoastersPageProps {
  searchParams: { 
    q?: string;
    roastingStyles?: string;
    state?: string;
    city?: string;
    page?: string;
  };
}

export default async function RoastersPage({ searchParams }: RoastersPageProps) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 20;

  const where = {
    AND: [
      // Search query
      searchParams.q ? {
        OR: [
          { name: { contains: searchParams.q, mode: 'insensitive' } },
          { description: { contains: searchParams.q, mode: 'insensitive' } }
        ]
      } : {},
      
      // Roasting styles
      searchParams.roastingStyles ? {
        roastingStyles: {
          hasSome: searchParams.roastingStyles.split(',')
        }
      } : {},
      
      // Location
      searchParams.state ? { state: searchParams.state } : {},
      searchParams.city ? { city: searchParams.city } : {}
    ]
  };

  const [roasters, total] = await Promise.all([
    prisma.roaster.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { name: 'asc' }
    }),
    prisma.roaster.count({ where })
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Coffee Roasters</h1>
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <SearchContainer />
        </div>
        
        <div className="md:col-span-3">
          <div className="mb-4 text-sm text-gray-600">
            Found {total} roaster{total === 1 ? '' : 's'}
          </div>
          
          <RoasterList roasters={roasters} />
          
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`/roasters?${new URLSearchParams({
                    ...searchParams,
                    page: p.toString()
                  })}`}
                  className={`px-4 py-2 rounded ${p === page ? 'bg-brown-600 text-white' : 'bg-gray-100'}`}
                >
                  {p}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
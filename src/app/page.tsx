import { SearchContainer } from '@/components/search/SearchContainer';
import { prisma } from '@/lib/prisma';
import { RoasterCard } from '@/components/roasters/RoasterCard';

export default async function Home() {
  try {
    const featuredRoasters = await prisma.roaster.findMany({
      where: { featured: true },
      take: 6
    }).catch(error => {
      console.error('Database query failed:', error);
      return [];
    });

    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Specialty Coffee Roaster Directory
        </h1>
        
        <div className="mb-12">
          <SearchContainer />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Roasters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRoasters.map((roaster) => (
              <RoasterCard key={roaster.id} roaster={roaster} />
            ))}
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error('Error in Home page:', error);
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Specialty Coffee Roaster Directory
        </h1>
        <p className="text-center text-gray-600">
          Loading coffee roasters...
        </p>
      </main>
    );
  }
}
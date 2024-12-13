import { prisma } from '@/lib/prisma';
import { RoasterDetail } from '@/components/roasters/RoasterDetail';
import { notFound } from 'next/navigation';

interface RoasterPageProps {
  params: {
    slug: string;
  };
}

export default async function RoasterPage({ params }: RoasterPageProps) {
  const roaster = await prisma.roaster.findUnique({
    where: { slug: params.slug }
  });

  if (!roaster) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <RoasterDetail roaster={roaster} />
    </main>
  );
}
import { type Roaster } from '@prisma/client';
import { RoasterCard } from './RoasterCard';

interface RoasterListProps {
  roasters: Roaster[];
}

export const RoasterList: React.FC<RoasterListProps> = ({ roasters }) => {
  if (!roasters.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No roasters found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roasters.map((roaster) => (
        <RoasterCard key={roaster.id} roaster={roaster} />
      ))}
    </div>
  );
};
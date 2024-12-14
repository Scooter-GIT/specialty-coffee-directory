import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe } from 'lucide-react';
import Link from 'next/link';
import type { Roaster } from '@prisma/client';

interface RoasterCardProps {
  roaster: Roaster;
}

export const RoasterCard: React.FC<RoasterCardProps> = ({ roaster }) => {
  return (
    <Link href={`/roasters/${roaster.slug}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl mb-2">{roaster.name}</CardTitle>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {roaster.city}, {roaster.state}
              </div>
            </div>
            {roaster.website && (
              <a 
                href={roaster.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gray-500 hover:text-gray-700"
              >
                <Globe className="h-5 w-5" />
              </a>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {roaster.description && (
            <CardDescription className="mb-4">
              {roaster.description}
            </CardDescription>
          )}
          <div className="flex flex-wrap gap-2">
            {roaster.roastingStyles.map((style) => (
              <Badge key={style} variant="secondary">
                {style}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
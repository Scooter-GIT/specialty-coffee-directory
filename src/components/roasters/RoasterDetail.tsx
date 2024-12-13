import { type Roaster } from '@prisma/client';

interface RoasterDetailProps {
  roaster: Roaster;
}

export const RoasterDetail: React.FC<RoasterDetailProps> = ({ roaster }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{roaster.name}</h1>
      
      {roaster.description && (
        <p className="text-gray-700 mb-6">{roaster.description}</p>
      )}
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Location</h2>
          <address className="not-italic">
            <p>{roaster.address}</p>
            <p>{roaster.city}, {roaster.state} {roaster.zipCode}</p>
          </address>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact</h2>
          {roaster.phone && <p>Phone: {roaster.phone}</p>}
          {roaster.email && <p>Email: {roaster.email}</p>}
          {roaster.website && (
            <p>
              <a 
                href={roaster.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown-600 hover:text-brown-800"
              >
                Visit Website
              </a>
            </p>
          )}
        </div>
      </div>
      
      {roaster.roastingStyles.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Roasting Styles</h2>
          <div className="flex flex-wrap gap-2">
            {roaster.roastingStyles.map((style) => (
              <span
                key={style}
                className="px-3 py-1 bg-brown-100 text-brown-800 rounded-full"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
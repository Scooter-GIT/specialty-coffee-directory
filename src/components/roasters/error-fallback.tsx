export function RoasterErrorFallback({ error }: { error?: Error }) {
  return (
    <div className="p-6 max-w-xl mx-auto mt-8 bg-red-50 rounded-lg border border-red-200">
      <h2 className="text-xl font-semibold text-red-800 mb-2">
        Unable to Load Roaster Data
      </h2>
      <p className="text-red-600 mb-4">
        {error?.message || 'An unexpected error occurred while loading roaster information.'}
      </p>
      <p className="text-sm text-red-700">
        Please try refreshing the page or come back later.
      </p>
    </div>
  );
}
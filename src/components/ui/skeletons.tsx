/**
 * Reusable skeleton components for loading states.
 */

export const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="aspect-[4/5] bg-secondary mb-4" />
    <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
    <div className="h-3 bg-secondary rounded w-1/2" />
  </div>
);

export const SkeletonLine = ({ width = "w-full" }: { width?: string }) => (
  <div className={`h-4 bg-secondary rounded animate-pulse ${width}`} />
);

export const SkeletonBlock = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-3 animate-pulse">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-secondary rounded ${i === lines - 1 ? "w-2/3" : "w-full"}`}
      />
    ))}
  </div>
);

export const SkeletonGrid = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

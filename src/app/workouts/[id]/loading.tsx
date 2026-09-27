export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0c0d0f] px-4 py-8 sm:px-6 md:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_1fr]">
          
          {/* Image Skeleton */}
          <div className="aspect-square animate-pulse rounded-lg bg-[#15171c] lg:aspect-auto lg:min-h-[650px]" />

          {/* Content Skeleton */}
          <div className="space-y-5 py-5">
            <div className="h-10 w-3/4 animate-pulse rounded bg-[#15171c]" />

            <div className="h-16 w-full animate-pulse rounded bg-[#15171c]" />

            <div className="h-6 w-32 animate-pulse rounded bg-[#15171c]" />

            <div className="h-[300px] animate-pulse rounded-lg bg-[#15171c]" />

            <div className="h-24 animate-pulse rounded bg-[#15171c]" />

            <div className="h-12 w-64 animate-pulse rounded bg-[#15171c]" />
          </div>

        </div>
      </div>
    </main>
  );
}
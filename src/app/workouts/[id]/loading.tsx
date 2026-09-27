export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0c0d0f] px-4 py-8 sm:px-6 md:px-8 lg:px-10">

      <div className="mx-auto max-w-[1400px]">

        {/* Hero Skeleton */}

        <div
          className="
            h-[340px]
            animate-pulse
            rounded-xl
            bg-[#15171c]
            sm:h-[380px]
            lg:h-[400px]
          "
        />

        {/* Library */}

        <div className="mt-10">

          <div className="h-8 w-40 animate-pulse rounded bg-[#15171c]" />

          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-[#15171c]" />

          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    overflow-hidden
                    rounded-lg
                    border
                    border-[#25282e]
                    bg-[#15171c]
                  "
                >
                  <div className="aspect-[16/9] animate-pulse bg-[#1b1e23]" />

                  <div className="space-y-3 p-4">
                    <div className="h-5 w-20 animate-pulse rounded bg-[#1b1e23]" />
                    <div className="h-6 w-3/4 animate-pulse rounded bg-[#1b1e23]" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-[#1b1e23]" />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
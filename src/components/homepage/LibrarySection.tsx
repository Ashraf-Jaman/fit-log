import { getWorkouts } from "@/services/workout.service";
import WorkoutCard from "./WorkoutCard";

const LibrarySection = async () => {
  const workouts = await getWorkouts();

  return (
    <section
      id="library"
      className="
        scroll-mt-24
        w-full
        px-4
        py-10
        sm:px-6
        sm:py-12
        md:px-8
        lg:px-10
        lg:py-16
      "
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-6">
          <h2
            className="
              text-2xl
              font-black
              uppercase
              tracking-tight
              text-white
              sm:text-3xl
            "
          >
            The Library
          </h2>

          <p className="mt-1 text-xs text-[#85878d] sm:text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Workout Grid */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LibrarySection;
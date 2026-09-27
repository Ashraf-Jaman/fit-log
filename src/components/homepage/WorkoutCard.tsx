import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="
        group
        overflow-hidden
        rounded-lg
        border
        border-[#25282e]
        bg-[#15171c]
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-[#3a3e45]
      "
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Muscle Groups */}
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="
                rounded-sm
                bg-[#c6ff00]
                px-2
                py-1
                text-[10px]
                font-bold
                uppercase
                leading-none
                text-black
              "
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3
          className="
            mt-3
            text-base
            font-bold
            uppercase
            leading-tight
            text-white
            sm:text-lg
          "
        >
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1.5 truncate text-sm text-[#85878d]">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div
          className="
            mt-4
            flex
            items-center
            gap-4
            border-t
            border-[#25282e]
            pt-3
            text-xs
            text-[#777a82]
            sm:text-sm
          "
        >
          {/* Duration */}
          <span className="flex items-center gap-1.5">
            <Clock3 size={14} />
            {workout.duration} min
          </span>

          {/* Calories */}
          <span className="flex items-center gap-1.5">
            <Flame size={14} />
            {workout.caloriesBurned} kcal
          </span>

          {/* Rating */}
          <span className="flex items-center gap-1.5">
            <Star size={14} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
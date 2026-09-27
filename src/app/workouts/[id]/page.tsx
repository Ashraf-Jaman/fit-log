import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarPlus,
  Bookmark,
  Clock3,
  Flame,
  Star,
} from "lucide-react";

import { getWorkoutById } from "@/services/workout.service";
import WorkoutActions from "@/components/WorkoutActions";

interface WorkoutPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutPage({
  params,
}: WorkoutPageProps) {
  const { id } = await params;

  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0c0d0f] px-4 py-8 text-white sm:px-6 md:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Back Button */}
        <Link
          href="/#library"
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-xs
            font-medium
            text-[#85878d]
            transition-colors
            hover:text-[#c6ff00]
          "
        >
          <ArrowLeft size={15} />
          Back to Library
        </Link>

        {/* Main Layout */}
        <div
          className="
            grid
            grid-cols-1
            gap-8
            lg:grid-cols-[1.05fr_1fr]
            lg:gap-10
          "
        >
          {/* ================= IMAGE ================= */}
          <div
            className="
              relative
              aspect-square
              overflow-hidden
              rounded-lg
              border
              border-[#25282e]
              bg-[#15171c]
              lg:aspect-auto
              lg:min-h-[650px]
            "
          >
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* ================= DETAILS ================= */}
          <div className="flex flex-col justify-center">

            {/* Title */}
            <h1
              className="
                text-3xl
                font-black
                uppercase
                leading-none
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-[42px]
              "
            >
              {workout.name}
            </h1>

            {/* Description */}
            <p
              className="
                mt-4
                max-w-[620px]
                text-sm
                leading-6
                text-[#85878d]
              "
            >
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="
                    rounded-full
                    bg-[#c6ff00]
                    px-3
                    py-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-black
                  "
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* ================= SPECS ================= */}
            <div
              className="
                mt-6
                overflow-hidden
                rounded-lg
                border
                border-[#25282e]
                bg-[#15171c]
              "
            >
              {/* Equipment */}
              <SpecRow
                label="Equipment"
                value={workout.equipment}
              />

              {/* Difficulty */}
              <SpecRow
                label="Difficulty"
                value={workout.difficulty}
              />

              {/* Sets */}
              <SpecRow
                label="Sets"
                value={String(workout.sets)}
              />

              {/* Reps */}
              <SpecRow
                label="Reps"
                value={workout.reps}
              />

              {/* Duration */}
              <SpecRow
                label="Duration"
                value={`${workout.duration} min`}
              />

              {/* Calories */}
              <SpecRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              {/* Rating */}
              <SpecRow
                label="Rating"
                value={String(workout.rating)}
                last
              />
            </div>

            {/* ================= INSTRUCTIONS ================= */}
            <div className="mt-6">
              <h2
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                "
              >
                Instructions
              </h2>

              <ol className="mt-3 space-y-2.5">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="
                      flex
                      gap-3
                      text-xs
                      leading-5
                      text-[#85878d]
                    "
                  >
                    <span className="shrink-0 text-[#6f7279]">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* ================= ACTIONS ================= */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ================= SPEC ROW ================= */

interface SpecRowProps {
  label: string;
  value: string;
  last?: boolean;
}

function SpecRow({
  label,
  value,
  last = false,
}: SpecRowProps) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        px-4
        py-3
        ${
          !last
            ? "border-b border-[#25282e]"
            : ""
        }
      `}
    >
      <span
        className="
          text-[9px]
          font-medium
          uppercase
          tracking-[0.08em]
          text-[#777a82]
        "
      >
        {label}
      </span>

      <span
        className="
          text-xs
          font-medium
          text-[#d7d8db]
        "
      >
        {value}
      </span>
    </div>
  );
}
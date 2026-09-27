"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { Workout } from "@/types/workout";

type TabType = "today" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlan() {
  const [activeTab, setActiveTab] =
    useState<TabType>("today");

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [todayPlan, setTodayPlan] =
    useState<Workout[]>([]);

  const [savedExercises, setSavedExercises] =
    useState<Workout[]>([]);

  const [completedExercises, setCompletedExercises] =
    useState<number[]>([]);

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState("");

  /* ========================================
     LOAD DATA
  ======================================== */

  const loadData = () => {
    try {
      const today =
        localStorage.getItem("todayPlan");

      const saved =
        localStorage.getItem("savedExercises");

      const completed =
        localStorage.getItem(
          "completedExercises"
        );

      setTodayPlan(
        today ? JSON.parse(today) : []
      );

      setSavedExercises(
        saved ? JSON.parse(saved) : []
      );

      setCompletedExercises(
        completed
          ? JSON.parse(completed)
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load FitLog data:",
        error
      );

      setTodayPlan([]);
      setSavedExercises([]);
      setCompletedExercises([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener(
      "fitlog-storage-update",
      handleUpdate
    );

    window.addEventListener(
      "storage",
      handleUpdate
    );

    return () => {
      window.removeEventListener(
        "fitlog-storage-update",
        handleUpdate
      );

      window.removeEventListener(
        "storage",
        handleUpdate
      );
    };
  }, []);

  /* ========================================
     TOAST
  ======================================== */

  const showToast = (text: string) => {
    setToast(text);

    setTimeout(() => {
      setToast("");
    }, 2200);
  };

  /* ========================================
     ACTIVE LIST
  ======================================== */

  const activeList = useMemo(() => {
    if (activeTab === "today") {
      return todayPlan;
    }

    return savedExercises;
  }, [
    activeTab,
    todayPlan,
    savedExercises,
  ]);

  /* ========================================
     SORT
  ======================================== */

  const sortedList = useMemo(() => {
    const list = [...activeList];

    if (sortBy === "duration") {
      list.sort(
        (a, b) =>
          Number(b.duration) -
          Number(a.duration)
      );
    }

    if (sortBy === "calories") {
      list.sort(
        (a, b) =>
          Number(b.caloriesBurned) -
          Number(a.caloriesBurned)
      );
    }

    if (sortBy === "rating") {
      list.sort(
        (a, b) =>
          Number(b.rating) -
          Number(a.rating)
      );
    }

    return list;
  }, [activeList, sortBy]);

  /* ========================================
     METRICS
  ======================================== */

  const totalMinutes = useMemo(() => {
    return activeList.reduce(
      (sum, workout) =>
        sum + Number(workout.duration || 0),
      0
    );
  }, [activeList]);

  const totalCalories = useMemo(() => {
    return activeList.reduce(
      (sum, workout) =>
        sum +
        Number(
          workout.caloriesBurned || 0
        ),
      0
    );
  }, [activeList]);

  /* ========================================
     REMOVE
  ======================================== */

  const handleRemove = (id: number) => {
    if (activeTab === "today") {
      const updated = todayPlan.filter(
        (workout) => workout.id !== id
      );

      setTodayPlan(updated);

      localStorage.setItem(
        "todayPlan",
        JSON.stringify(updated)
      );

      const updatedCompleted =
        completedExercises.filter(
          (completedId) =>
            completedId !== id
        );

      setCompletedExercises(
        updatedCompleted
      );

      localStorage.setItem(
        "completedExercises",
        JSON.stringify(
          updatedCompleted
        )
      );

      showToast(
        "Removed from today's plan"
      );
    } else {
      const updated =
        savedExercises.filter(
          (workout) => workout.id !== id
        );

      setSavedExercises(updated);

      localStorage.setItem(
        "savedExercises",
        JSON.stringify(updated)
      );

      showToast(
        "Removed from saved"
      );
    }

    window.dispatchEvent(
      new Event("fitlog-storage-update")
    );
  };

  /* ========================================
     MARK DONE
  ======================================== */

  const handleMarkDone = (id: number) => {
    const alreadyDone =
      completedExercises.includes(id);

    let updated: number[];

    if (alreadyDone) {
      updated = completedExercises.filter(
        (item) => item !== id
      );

      showToast(
        "Workout marked as unfinished"
      );
    } else {
      updated = [
        ...completedExercises,
        id,
      ];

      showToast(
        "Workout marked as done!"
      );
    }

    setCompletedExercises(updated);

    localStorage.setItem(
      "completedExercises",
      JSON.stringify(updated)
    );
  };

  /* ========================================
     LOADING
  ======================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0c0d0f] px-4 py-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="h-10 w-48 animate-pulse rounded bg-[#15171c]" />

          <div className="mt-3 h-4 w-80 animate-pulse rounded bg-[#15171c]" />

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="h-28 animate-pulse rounded-lg bg-[#15171c]" />
            <div className="h-28 animate-pulse rounded-lg bg-[#15171c]" />
            <div className="h-28 animate-pulse rounded-lg bg-[#15171c]" />
          </div>

          <div className="mt-6 h-12 animate-pulse rounded-lg bg-[#15171c]" />

          <div className="mt-5 space-y-3">
            <div className="h-24 animate-pulse rounded-lg bg-[#15171c]" />
            <div className="h-24 animate-pulse rounded-lg bg-[#15171c]" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0d0f] px-4 py-8 text-white sm:px-6 md:px-8 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}

        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl">
            My Plan
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#85878d] sm:text-base">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </div>

        {/* METRICS */}

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Metric
            title="Exercises"
            value={activeList.length}
          />

          <Metric
            title="Minutes"
            value={totalMinutes}
          />

          <Metric
            title="Calories"
            value={totalCalories}
          />
        </div>

        {/* TABS + SORT */}

        <div className="mt-7 flex flex-col gap-4 border-b border-[#25282e] pb-4 sm:flex-row sm:items-center sm:justify-between">

          {/* TABS */}

          <div className="flex w-fit rounded-md border border-[#25282e] bg-[#111318] p-1">

            <button
              type="button"
              onClick={() =>
                setActiveTab("today")
              }
              className={`
                rounded px-4 py-2 text-xs font-medium transition sm:px-5
                ${
                  activeTab === "today"
                    ? "bg-[#c6ff00] text-black"
                    : "text-[#85878d] hover:text-white"
                }
              `}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("saved")
              }
              className={`
                rounded px-4 py-2 text-xs font-medium transition sm:px-5
                ${
                  activeTab === "saved"
                    ? "bg-[#c6ff00] text-black"
                    : "text-[#85878d] hover:text-white"
                }
              `}
            >
              Saved
            </button>

          </div>

          {/* SORT */}

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#777a82]">
              Sort By
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target
                      .value as SortOption
                  )
                }
                className="
                  cursor-pointer
                  appearance-none
                  rounded-md
                  border
                  border-[#25282e]
                  bg-[#15171c]
                  py-2
                  pl-3
                  pr-9
                  text-xs
                  font-medium
                  text-white
                  outline-none
                  hover:border-[#454950]
                  focus:border-[#c6ff00]
                "
              >
                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>
              </select>

              <ChevronDown
                size={14}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-[#85878d]
                "
              />
            </div>
          </div>
        </div>

        {/* LIST */}

        {sortedList.length === 0 ? (
          <EmptyState
            tab={activeTab}
          />
        ) : (
          <div className="mt-5 space-y-3">
            {sortedList.map(
              (workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  isToday={
                    activeTab === "today"
                  }
                  isDone={completedExercises.includes(
                    workout.id
                  )}
                  onRemove={
                    handleRemove
                  }
                  onDone={
                    handleMarkDone
                  }
                />
              )
            )}
          </div>
        )}
      </div>

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-lg border border-[#3b5300] bg-[#18220d] px-5 py-3 text-sm font-medium text-[#c6ff00] shadow-2xl">
          {toast}
        </div>
      )}
    </main>
  );
}

/* ==========================================
   METRIC
========================================== */

function Metric({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-[#25282e] bg-[#15171c] px-5 py-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#777a82]">
        {title}
      </p>

      <p className="mt-2 text-2xl font-black text-[#c6ff00] sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

/* ==========================================
   WORKOUT CARD
========================================== */

function WorkoutCard({
  workout,
  isToday,
  isDone,
  onRemove,
  onDone,
}: {
  workout: Workout;
  isToday: boolean;
  isDone: boolean;
  onRemove: (id: number) => void;
  onDone: (id: number) => void;
}) {
  return (
    <div
      className={`
        flex flex-col gap-4 rounded-lg border
        bg-[#15171c] p-3 transition
        sm:flex-row sm:items-center sm:p-4
        ${
          isDone
            ? "border-[#3b5300] opacity-75"
            : "border-[#25282e] hover:border-[#3a3e45]"
        }
      `}
    >
      {/* IMAGE */}

      <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-md bg-[#0c0d0f] sm:h-20 sm:w-28">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className={`object-cover ${
            isDone ? "grayscale" : ""
          }`}
        />
      </div>

      {/* INFO */}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className={`
              truncate
              text-sm
              font-bold
              uppercase
              sm:text-base
              ${
                isDone
                  ? "text-[#777a82] line-through"
                  : "text-white"
              }
            `}
          >
            {workout.name}
          </h3>

          {isDone && (
            <span className="rounded-full bg-[#c6ff00] px-2 py-0.5 text-[9px] font-bold uppercase text-black">
              Done
            </span>
          )}
        </div>

        <p className="mt-1 truncate text-xs text-[#777a82] sm:text-sm">
          {workout.equipment}
        </p>

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#85878d]">

          <span className="flex items-center gap-1">
            <Clock3 size={13} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={13} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star size={13} />
            {workout.rating}
          </span>

        </div>
      </div>

      {/* ACTIONS */}

      <div className="flex shrink-0 flex-wrap items-center gap-2">

        <Link
          href={`/workouts/${workout.id}`}
          className="
            rounded-md
            border
            border-[#34363b]
            px-3
            py-2
            text-[10px]
            font-medium
            text-[#d0d1d4]
            transition
            hover:border-[#c6ff00]
            hover:text-[#c6ff00]
          "
        >
          View Details
        </Link>

        {isToday && (
          <button
            type="button"
            onClick={() =>
              onDone(workout.id)
            }
            className={`
              inline-flex
              items-center
              gap-1.5
              rounded-md
              px-3
              py-2
              text-[10px]
              font-bold
              ${
                isDone
                  ? "bg-[#25282e] text-[#85878d]"
                  : "bg-[#c6ff00] text-black"
              }
            `}
          >
            <Check size={13} />

            {isDone
              ? "Done"
              : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={() =>
            onRemove(workout.id)
          }
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            border
            border-[#34363b]
            text-[#777a82]
            hover:border-red-500
            hover:text-red-400
          "
        >
          <X size={15} />
        </button>

      </div>
    </div>
  );
}

/* ==========================================
   EMPTY STATE
========================================== */

function EmptyState({
  tab,
}: {
  tab: TabType;
}) {
  return (
    <div className="mt-5 flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-[#25282e] bg-[#0f1115] px-6 text-center">

      <h2 className="text-lg font-black uppercase text-white sm:text-xl">
        Nothing Here Yet
      </h2>

      <p className="mt-2 max-w-sm text-xs leading-5 text-[#777a82] sm:text-sm">
        {tab === "today"
          ? "Browse the library and add a lift to get today moving."
          : "Save your favorite workouts and they will appear here."}
      </p>

      <Link
        href="/#library"
        className="mt-5 rounded-md bg-[#c6ff00] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-black hover:bg-[#d5ff4d]"
      >
        Go to workouts
      </Link>
    </div>
  );
}
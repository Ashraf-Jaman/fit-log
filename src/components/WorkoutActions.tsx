"use client";

import {
  Bookmark,
  CalendarPlus,
  Check,
} from "lucide-react";
import { useState } from "react";

import { Workout } from "@/types/workout";

interface WorkoutActionsProps {
  workout: Workout;
}

const WorkoutActions = ({
  workout,
}: WorkoutActionsProps) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error"
  >("success");

  const showMessage = (
    text: string,
    type: "success" | "error" = "success"
  ) => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleAddToPlan = () => {
    const storedPlan = localStorage.getItem("todayPlan");

    const todayPlan: Workout[] = storedPlan
      ? JSON.parse(storedPlan)
      : [];

    // Already added
    const alreadyExists = todayPlan.some(
      (item) => item.id === workout.id
    );

    if (alreadyExists) {
      showMessage(
        "This workout is already in today's plan.",
        "error"
      );
      return;
    }

    // Maximum 5 workouts
    if (todayPlan.length >= 5) {
      showMessage(
        "Today's plan is full. Maximum 5 lifts allowed.",
        "error"
      );
      return;
    }

    const updatedPlan = [...todayPlan, workout];

    localStorage.setItem(
      "todayPlan",
      JSON.stringify(updatedPlan)
    );

    // Update navbar
    window.dispatchEvent(
      new Event("fitlog-storage-update")
    );

    showMessage(
      "Added to today's plan!"
    );
  };

  const handleSaveForLater = () => {
    const storedSaved =
      localStorage.getItem("savedExercises");

    const savedExercises: Workout[] = storedSaved
      ? JSON.parse(storedSaved)
      : [];

    const alreadySaved = savedExercises.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      showMessage(
        "This workout is already saved.",
        "error"
      );
      return;
    }

    const updatedSaved = [
      ...savedExercises,
      workout,
    ];

    localStorage.setItem(
      "savedExercises",
      JSON.stringify(updatedSaved)
    );

    // Update navbar
    window.dispatchEvent(
      new Event("fitlog-storage-update")
    );

    showMessage(
      "Saved for later!"
    );
  };

  return (
    <div className="relative mt-6">

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">

        {/* Add To Plan */}
        <button
          type="button"
          onClick={handleAddToPlan}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-md
            bg-[#c6ff00]
            px-4
            py-2.5
            text-[10px]
            font-bold
            text-black
            transition-all
            duration-200
            hover:bg-[#d5ff4d]
            active:scale-95
          "
        >
          <CalendarPlus size={14} />
          Add to today's plan
        </button>

        {/* Save */}
        <button
          type="button"
          onClick={handleSaveForLater}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-md
            border
            border-[#34363b]
            bg-transparent
            px-4
            py-2.5
            text-[10px]
            font-medium
            text-[#d0d1d4]
            transition-all
            duration-200
            hover:border-[#c6ff00]
            hover:text-[#c6ff00]
            active:scale-95
          "
        >
          <Bookmark size={14} />
          Save for later
        </button>
      </div>

      {/* Toast */}
      {message && (
        <div
          className={`
            absolute
            left-0
            top-full
            z-20
            mt-3
            flex
            items-center
            gap-2
            rounded-md
            border
            px-4
            py-2.5
            text-xs
            shadow-xl
            ${
              messageType === "success"
                ? "border-[#3b5300] bg-[#18220d] text-[#c6ff00]"
                : "border-[#5a2929] bg-[#241313] text-[#ff8a8a]"
            }
          `}
        >
          {messageType === "success" && (
            <Check size={14} />
          )}

          {message}
        </div>
      )}
    </div>
  );
};

export default WorkoutActions;
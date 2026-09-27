"use client";

import { Check, Heart, Plus } from "lucide-react";
import { useState } from "react";

import type { Workout } from "@/types/workout";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2200);
  };

  /* ========================================
     ADD TO TODAY'S PLAN
  ======================================== */

  const handleAddToPlan = () => {
    try {
      const stored =
        localStorage.getItem(
          "todayPlan"
        );

      const currentPlan: Workout[] =
        stored ? JSON.parse(stored) : [];

      /* Duplicate check */

      const alreadyExists =
        currentPlan.some(
          (item) =>
            item.id === workout.id
        );

      if (alreadyExists) {
        showToast(
          "Already added to today's plan"
        );
        return;
      }

      /* 5 WORKOUT LIMIT */

      if (currentPlan.length >= 5) {
        showToast(
          "Today's plan is full (5 lifts max)"
        );
        return;
      }

      const updatedPlan = [
        ...currentPlan,
        workout,
      ];

      localStorage.setItem(
        "todayPlan",
        JSON.stringify(updatedPlan)
      );

      /* IMPORTANT */

      window.dispatchEvent(
        new Event("fitlog-storage-update")
      );

      showToast(
        "Added to today's plan"
      );
    } catch (error) {
      console.error(error);

      showToast(
        "Something went wrong"
      );
    }
  };

  /* ========================================
     SAVE FOR LATER
  ======================================== */

  const handleSaveForLater = () => {
    try {
      const stored =
        localStorage.getItem(
          "savedExercises"
        );

      const currentSaved: Workout[] =
        stored ? JSON.parse(stored) : [];

      /* Duplicate check */

      const alreadySaved =
        currentSaved.some(
          (item) =>
            item.id === workout.id
        );

      if (alreadySaved) {
        showToast(
          "Already saved"
        );
        return;
      }

      const updatedSaved = [
        ...currentSaved,
        workout,
      ];

      localStorage.setItem(
        "savedExercises",
        JSON.stringify(updatedSaved)
      );

      /* IMPORTANT */

      window.dispatchEvent(
        new Event("fitlog-storage-update")
      );

      showToast(
        "Saved for later"
      );
    } catch (error) {
      console.error(error);

      showToast(
        "Something went wrong"
      );
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">

        {/* ADD */}

        <button
          type="button"
          onClick={handleAddToPlan}
          className="
            inline-flex
            items-center
            gap-2
            rounded-md
            bg-[#c6ff00]
            px-4
            py-2.5
            text-xs
            font-bold
            text-black
            transition
            hover:bg-[#d5ff4d]
            active:scale-95
          "
        >
          <Plus size={14} />

          Add to today&apos;s plan
        </button>

        {/* SAVE */}

        <button
          type="button"
          onClick={handleSaveForLater}
          className="
            inline-flex
            items-center
            gap-2
            rounded-md
            border
            border-[#34363b]
            bg-[#111318]
            px-4
            py-2.5
            text-xs
            font-medium
            text-[#d0d1d4]
            transition
            hover:border-[#c6ff00]
            hover:text-[#c6ff00]
          "
        >
          <Heart size={14} />

          Save for later
        </button>

      </div>

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[999] -translate-x-1/2 rounded-lg border border-[#3b5300] bg-[#18220d] px-5 py-3 text-sm font-medium text-[#c6ff00] shadow-2xl">

          <div className="flex items-center gap-2">
            <Check size={15} />
            {toast}
          </div>

        </div>
      )}
    </>
  );
}
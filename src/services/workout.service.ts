import { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export const getWorkouts = async (): Promise<Workout[]> => {
  const response = await fetch(API_URL, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
};

export const getWorkoutById = async (
  id: string
): Promise<Workout | null> => {
  const response = await fetch(`${API_URL}/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};
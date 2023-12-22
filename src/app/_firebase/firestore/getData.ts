import {
  collection,
  query,
  getDocs,
  where,
  DocumentData,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../config";
import { ExerciseProps, RoutineProps } from "@/app/_types";

function decodeFirebaseKey(encodedKey: string) {
  return decodeURIComponent(
    encodedKey.replace(/(%[0-9a-f]{2})/g, (match) => {
      return String.fromCharCode(parseInt(match.substr(1), 16));
    })
  );
}

export async function getRoutine(
  searchTerm = ""
): Promise<{ results: RoutineProps[]; error: any }> {
  // First, ensure the user is authenticated
  if (!auth.currentUser) {
    return { results: [], error: "User not authenticated" };
  }

  const userId = auth.currentUser.uid;
  // Updated path to 'users/userId/routines'
  const routinesRef = collection(db, `users/${userId}/routines`);

  // Update the query to reflect the new structure
  const q = searchTerm
    ? query(routinesRef, where("Routine_Name", "==", searchTerm))
    : routinesRef;

  let results: RoutineProps[] = [];
  let error = null;

  try {
    const querySnapshot = await getDocs(q);
    const routines = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: decodeFirebaseKey(doc.id),
        ...data,
      } as RoutineProps;
    });

    results = { ...routines };
  } catch (e) {
    error = e;
  }

  return { results, error };
}

export const getMyRoutines = async () => {
  return new Promise<DocumentData[]>((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        // Updated path to 'users/userId/routines'
        const routinesRef = collection(db, `users/${userId}/routines`);
        try {
          const querySnapshot = await getDocs(routinesRef);
          const routines = querySnapshot.docs.map((doc) => ({
            id: decodeFirebaseKey(doc.id),
            ...doc.data(),
          }));
          resolve(routines);
        } catch (e) {
          console.error("Error fetching documents: ", e);
          resolve([]);
        }
      } else {
        resolve([]);
      }
    });
  });
};

export async function getExercises(
  searchTerm = ""
): Promise<{ results: ExerciseProps[]; error: any }> {
  const exercisesRef = collection(db, "exercises");
  const q = searchTerm
    ? query(exercisesRef, where("Exercise_Name", "==", searchTerm))
    : exercisesRef;

  let results: ExerciseProps[] = [];
  let error = null;

  try {
    const querySnapshot = await getDocs(q);
    const exercises = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as ExerciseProps;
    });

    results = exercises;
  } catch (e) {
    error = e;
  }

  return { results, error };
}

export async function getExerciseIds() {
  const routinesRef = collection(db, "exercises");

  let results: string[] = [];
  let error = null;

  try {
    const querySnapshot = await getDocs(routinesRef);
    results = querySnapshot.docs.map((doc) => doc.id);
  } catch (e) {
    error = e;
  }

  return { results, error };
}

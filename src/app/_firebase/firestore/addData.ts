import { doc, addDoc, setDoc, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../config";
import exercisesData from "../../../../public/exercises.json";
import { RoutineProps } from "@/app/_types";
import { encodeFirebaseKey } from "./utils";

export async function populateExercisesWithJSONData() {
  let results = [];
  let errors = [];

  for (const exercise of exercisesData) {
    const exerciseID = exercise.name.toLowerCase().replace(/ /g, "_");
    try {
      const result = await setDoc(doc(db, "exercises", exerciseID), exercise, {
        merge: true,
      });
      results.push(result);
    } catch (e) {
      errors.push({
        id: exerciseID,
        error: e,
      });
    }
  }

  return { results, errors };
}

export const storeRoutine = (routineData: RoutineProps) => {
  console.log(routineData);
  return new Promise<{ success: boolean; message: string }>(
    (resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userId = user.uid;
          const routineId = encodeFirebaseKey(
            routineData.id || "defaultRoutineId"
          );
          const routineRef = doc(db, `users/${userId}/routines`, routineId);

          setDoc(routineRef, {
            data: routineData,
          })
            .then(() => {
              resolve({
                success: true,
                message: "Routine saved successfully.",
              });
            })
            .catch((e) => {
              reject({ success: false, message: e.message });
            });
        } else {
          reject({ success: false, message: "User is not authenticated." });
        }
      });
    }
  );
};

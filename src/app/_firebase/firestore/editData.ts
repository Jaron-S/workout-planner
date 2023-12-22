import { onAuthStateChanged, updatePassword } from "firebase/auth";

import { auth, db } from "../config";
import { RoutineProps } from "@/app/_types";
import { doc, updateDoc } from "firebase/firestore";
import { encodeFirebaseKey } from "./utils";

export async function updateUserPassword(password: string) {
  const user = auth.currentUser;

  user &&
    updatePassword(user, password)
      .then((result) => {
        return { result };
      })
      .catch((error) => {
        return { error };
      });
}

export const updateRoutine = (routineData: RoutineProps) => {
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

          updateDoc(routineRef, {
            data: routineData,
          })
            .then(() => {
              resolve({
                success: true,
                message: "Routine updated successfully.",
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
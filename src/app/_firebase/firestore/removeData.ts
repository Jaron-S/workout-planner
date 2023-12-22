import { deleteUser, onAuthStateChanged } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../config";
import { reauthenticate, reauthenticateOAuthUser } from "../auth/auth";

export const removeRoutine = async (
  routineId: string
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        // Reference to the specific routine document
        const routineRef = doc(db, `users/${userId}/routines`, routineId);

        try {
          await deleteDoc(routineRef);
          resolve({ success: true, message: "Routine deleted successfully." });
        } catch (e) {
          reject({ success: false, message: e });
        }
      } else {
        reject({ success: false, message: "User is not authenticated." });
      }
    });
  });
};

export const removeUser = async (password: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("No authenticated user found");

  // Reathenticate user
  const providerId = user.providerData[0].providerId;
  let reauthResult;
  if (providerId === "password") {
    // Password auth
    const response = await reauthenticate(user, user.email, password);
    if (!response.success) {
      console.error("Reauthentication failed:", response.error);
      return response;
    }
  } else {
    // OAuth
    reauthResult = await reauthenticateOAuthUser(providerId);
    if (!reauthResult.success) {
      return reauthResult;
    }
  }

  try {
    // // Delete all user's data from Firestore collections
    const collectionsToDelete = ["routines"];
    for (const collectionName of collectionsToDelete) {
      const userCollectionRef = collection(
        db,
        "users",
        user.uid,
        collectionName
      );
      const q = query(userCollectionRef);
      const querySnapshot = await getDocs(q);

      const deletionPromises: Promise<void>[] = [];
      querySnapshot.forEach((docSnapshot) => {
        deletionPromises.push(deleteDoc(docSnapshot.ref));
      });
      await Promise.all(deletionPromises);
    }

    // Delete the user's main document
    const userDocRef = doc(db, "users", user.uid);
    await deleteDoc(userDocRef);

    // Delete user account
    await deleteUser(user);
  } catch (error) {
    console.error("Error removing user:", error);
  }
};

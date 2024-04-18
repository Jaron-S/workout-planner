import { FirebaseError } from "firebase/app";
import app from "../config";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  User,
  EmailAuthProvider,
  reauthenticateWithCredential,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  updatePassword,
  signInWithRedirect,
} from "firebase/auth";

const auth = getAuth(app);

export async function register(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function signIn(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function signOut() {
  let result = null,
    error = null;
  try {
    result = await firebaseSignOut(auth);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

// Auth Providers
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  return signInWithRedirect(auth, googleProvider);
};

export const getCurrentAuthProvider = () => {
  const user = auth.currentUser;

  if (user) {
    const providerId = user.providerData[0]?.providerId;
    return providerId || "unknown";
  } else {
    return null;
  }
};

// Reauthentication
export const reauthenticate = async (
  user: User,
  email: string,
  password: string
) => {
  const credential = EmailAuthProvider.credential(email, password);
  try {
    await reauthenticateWithCredential(user, credential);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { success: false, error: error.message, code: error.code };
    }
    return {
      success: false,
      error: "An unknown error occurred.",
      code: "auth/unknown-error",
    };
  }
};

export const reauthenticateOAuthUser = async (providerId: string) => {
  try {
    let provider;
    switch (providerId) {
      case GoogleAuthProvider.PROVIDER_ID:
        provider = new GoogleAuthProvider();
        break;
      // Handle other providers like Facebook, Twitter, etc.
      default:
        throw new Error("Unsupported provider for reauthentication");
    }

    await signInWithPopup(auth, provider);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { success: false, error: error.message, code: error.code };
    }
    return {
      success: false,
      error: "An unknown error occurred.",
      code: "auth/unknown-error",
    };
  }
};

// Edit account
export const changeUserPassword = async (
  user: User,
  currentPassword: string,
  newPassword: string
) => {
  const email = user.email;
  if (!email) {
    return {
      success: false,
      error: "User email is not available.",
      code: "auth/email-not-available",
    };
  }
  try {
    // Re-authenticate the user
    const reauthResult = await reauthenticate(
      user,
      user.email,
      currentPassword
    );

    if (!reauthResult.success) {
      return reauthResult;
    }

    // Update the password
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error) {
    console.error("Error changing password: ", error);
    if (error instanceof FirebaseError) {
      return { success: false, error: error.message, code: error.code };
    }
    return {
      success: false,
      error: "An unknown error occurred while changing the password.",
      code: "auth/unknown-error",
    };
  }
};

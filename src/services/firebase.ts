import { initializeApp } from "firebase/app";
import { Alert } from "react-native";
import {
  getAuth,
  signInWithPhoneNumber,
  signInWithCredential,
  signOut,
  PhoneAuthProvider,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  off,
  get,
  update,
  remove,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";

import keys from "../../keys.json";

const firebaseConfig = {
  apiKey: keys.apiKey,
  authDomain: keys.authDomain,
  projectId: keys.projectId,
  storageBucket: keys.storageBucket,
  messagingSenderId: keys.messagingSenderId,
  appId: keys.appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const sendVerificationCode = async (
  phoneNumber: string,
  recaptchaVerifier: any
) => {
  try {
    const verificationId = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );
    return verificationId;
  } catch (err: any) {
    Alert.alert(err.message);
    return null;
  }
};

const loginWithCredentials = async (credential: any, phone: any) => {
  try {
    await signInWithCredential(auth, credential);
    if (!auth.currentUser) {
      Alert.alert("Something went wrong, please try again");
      return null;
    }
    const snapshot = await get(ref(db, `users/${auth.currentUser.uid}`));
    if (snapshot.exists()) {
      return {
        data: snapshot.val(),
        auth: auth.currentUser,
      };
    } else {
      await set(ref(db, `users/${auth.currentUser?.uid}`), {
        phone,
        name: "",
        nationalId: "",
        dob: "",
        type: "User",
        uid: auth.currentUser.uid,
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/pickme-7a71e.appspot.com/o/default-avatar.png?alt=media&token=21bbd37b-847b-40a1-9ea5-28ee126463c5",
      });
      console.log("Data set.");
      return {
        data: {
          name: "",
        },
        auth: auth.currentUser,
      };
    }
  } catch (err: any) {
    Alert.alert(err.message);
    return null;
  }
};

const getAllTrips = async () => {
  try {
    const snapshot = await get(ref(db, "trips"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (err: any) {
    Alert.alert(err.message);
    return null;
  }
};

const logout = async () => {
  if (!auth.currentUser) return;
  try {
    await signOut(auth);
  } catch (err: any) {
    Alert.alert(err.message);
  }
};

const user = auth.currentUser;

export {
  auth,
  user,
  app,
  db,
  off,
  ref,
  set,
  update,
  remove,
  get,
  onChildChanged,
  onChildRemoved,
  sendVerificationCode,
  loginWithCredentials,
  PhoneAuthProvider,
  logout,
};

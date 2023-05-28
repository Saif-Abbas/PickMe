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
  get,
  update,
  onChildChanged,
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
  console.log(phoneNumber, recaptchaVerifier);
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
// /users/${auth.currentUser.uid}
//- Phone Number, Name, National ID, DOB, Gender, Type, Img?
// .... license, carLicense, carName, carPlate < for drivers
const loginWithCredentials = async (credential: any, phone: any) => {
  try {
    console.log(credential, phone);
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
      });
      console.log("Data set.");
      return {
        name: "",
        auth: auth.currentUser,
      };
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
  ref,
  set,
  update,
  get,
  onChildChanged,
  sendVerificationCode,
  loginWithCredentials,
  PhoneAuthProvider,
  logout,
};

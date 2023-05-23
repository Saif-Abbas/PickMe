import { initializeApp } from 'firebase/app';
import { Alert } from 'react-native';
import {
  getAuth,
  signInWithPhoneNumber,
  signInWithCredential,
  signOut,
  PhoneAuthProvider
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  onChildChanged
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAxdxH_Yh-n7WOBgullJK86SvzbZP5d-5w',
  authDomain: 'pickme-7a71e.firebaseapp.com',
  projectId: 'pickme-7a71e',
  storageBucket: 'pickme-7a71e.appspot.com',
  messagingSenderId: '262788238252',
  appId: '1:262788238252:web:bd131f322832a6389a8809'
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const sendVerificationCode = async (phoneNumber, recaptchaVerifier) => {
  try {
    const verificationId = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );
    return verificationId;
  } catch (err) {
    Alert.alert(err.message);
    return null;
  }
};
// /users/${auth.currentUser.uid}
//- Phone Number, Name, National ID, DOB, Gender, Type, Img?
// .... license, carLicense, carName, carPlate < for drivers
const loginWithCredentials = async (credential, phone) => {
  try {
    console.log(credential);
    await signInWithCredential(credential);
    if (!auth.currentUser) {
      Alert.alert('Something went wrong, please try again');
      return false;
    }
    await set(ref(db, `users/${auth.currentUser.uid}`), {
      phone: `${phone}}`,
      name: '',
      nationalId: '',
      dob: ''
    }).then(() => {
      console.log('Data set.');
      return true;
    });
    return true;
  } catch (err) {
    Alert.alert(err.message);
    return false;
  }
};

const logout = async () => {
  if (!auth.currentUser) return;
  try {
    await signOut(auth);
  } catch (err) {
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
  logout
};

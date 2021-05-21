import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAY3Fb5P_7c1r_qmXga0A5WZd0iMWK2A2I",
  authDomain: "crwn-db-c94b8.firebaseapp.com",
  projectId: "crwn-db-c94b8",
  storageBucket: "crwn-db-c94b8.appspot.com",
  messagingSenderId: "842554589449",
  appId: "1:842554589449:web:483f19297e3e835c4e93d8",
  measurementId: "G-BHL79RHZK7"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

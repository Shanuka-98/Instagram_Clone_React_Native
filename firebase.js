import * as firebase from 'firebase';



const firebaseConfig = {
  apiKey: "", // set your apiKey
  authDomain: "", // set your auth domain
  projectId: "", // set your project id
  storageBucket: "", // set your storageBucket
  messagingSenderId: "", // set your messagingSenderId
  appId: "" // set your app id
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export {firebase, db};

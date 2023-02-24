import * as firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyABsgfIlUps-UgrtdMbPpgSMW_LsHZs6RY",
  authDomain: "rn-instagram-clone-402bd.firebaseapp.com",
  projectId: "rn-instagram-clone-402bd",
  storageBucket: "rn-instagram-clone-402bd.appspot.com",
  messagingSenderId: "863527541581",
  appId: "1:863527541581:web:49df062d6f9cb9606ef504"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export {firebase, db};

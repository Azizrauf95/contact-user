 import {initializeApp} from 'firebase/app'
 import {getAuth} from 'firebase/auth'
 import {getFirestore} from 'firebase/firestore'
 import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

  
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjFmD8Zw9C-a6ZaO3lpbRONzHu-K87kds",
    authDomain: "face-auth-9e254.firebaseapp.com",
    databaseURL: "https://face-auth-9e254.firebaseio.com",
    projectId: "face-auth-9e254",
    storageBucket: "face-auth-9e254.appspot.com",
    messagingSenderId: "873180733075",
    appId: "1:873180733075:web:60d3d4512c154f8259f766"
  };
  

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const storage =getStorage(app);
 export const db = getFirestore(app);
 export const auth = getAuth (app)
 
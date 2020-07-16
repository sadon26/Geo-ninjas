import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAcJCtLMCmZk6k1a503GnK7fY0pRf6C5Sk',
  authDomain: 'vue-chat-e87c2.firebaseapp.com',
  databaseURL: 'https://vue-chat-e87c2.firebaseio.com',
  projectId: 'vue-chat-e87c2',
  storageBucket: 'vue-chat-e87c2.appspot.com',
  messagingSenderId: '272057281130',
  appId: '1:272057281130:web:2607b99a0d2b6436187813',
  measurementId: 'G-P6CZLV6MVN',
};
// Initialize Firebase
const firestoreApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firestoreApp.firestore();

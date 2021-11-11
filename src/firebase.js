import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBdZoSJIHwhWJbhSlrEU7xtoy05Ucu5pMk",
    authDomain: "chat-app-23ce6.firebaseapp.com",
    projectId: "chat-app-23ce6",
    storageBucket: "chat-app-23ce6.appspot.com",
    messagingSenderId: "374689419180",
    appId: "1:374689419180:web:026ba98633a33212207409"
};

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore();

export const database = {
    users: firestore.collection('users'),
    channels : firestore.collection('channels')
}

export const provider = new firebase.auth.GoogleAuthProvider()

export default firebase;
import { FirebaseOptions, initializeApp } from "firebase/app";
import { collection, CollectionReference, DocumentData, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyBhs3Zbso7WvJLsAngkvthSATSqn0nCrnw",
    authDomain: "chat-app-cf870.firebaseapp.com",
    projectId: "chat-app-cf870",
    storageBucket: "chat-app-cf870.appspot.com",
    messagingSenderId: "184700239809",
    appId: "1:184700239809:web:4235e3bdee81426c203940",
    measurementId: "G-M1Y49W3RJS"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app)

export const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}
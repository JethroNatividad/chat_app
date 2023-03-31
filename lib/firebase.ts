import { FirebaseOptions, initializeApp } from 'firebase/app';
import { collection, CollectionReference, DocumentData, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyCKVEatcjh2c2iJJrBIry_W45smW8tHJfM',
    authDomain: 'chat-app-a5f37.firebaseapp.com',
    projectId: 'chat-app-a5f37',
    storageBucket: 'chat-app-a5f37.appspot.com',
    messagingSenderId: '754589067226',
    appId: '1:754589067226:web:1066a58ad5ea22eb1682e3',
    measurementId: 'G-VYL8D95KG1'
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app)

export const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}
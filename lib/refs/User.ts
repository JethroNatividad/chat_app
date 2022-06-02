import { collection, CollectionReference, doc, DocumentData } from "firebase/firestore";
import { LastUniqueNumber, User } from "../../types/User";
import { db } from "../firebase";

export const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}

export const usersRef = createCollection<User>('users')

export const userRef = (uid: string) => {
    return doc(usersRef, uid)
}

export const lastUniqueNumberRef = doc(createCollection<LastUniqueNumber>('lastUniqueNumber'), 'LastUniqueNumber')
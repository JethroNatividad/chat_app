import { collection, CollectionReference, DocumentData } from "firebase/firestore"
import { db } from "./firebase"

export const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}


import { collection, CollectionReference, DocumentData } from "firebase/firestore"
import { db } from "./firebase"

export const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message
    return String(error)
}
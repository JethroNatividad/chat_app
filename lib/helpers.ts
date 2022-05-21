import { collection, CollectionReference, DocumentData, getDoc, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import { lastUniqueNumberRef } from "./refs/User"

export const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>
}

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message
    return String(error)
}

export const generateUniqueNumber = async () => {
    const lastUniqueNumber = await getDoc(lastUniqueNumberRef)
    const data = lastUniqueNumber.data()
    const newNumber = data ? data.LastUniqueNumber + 1 : 1
    await setDoc(lastUniqueNumberRef, { LastUniqueNumber: newNumber })
    return newNumber
}
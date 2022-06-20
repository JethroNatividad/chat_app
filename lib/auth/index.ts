import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { generateUniqueNumber, getErrorMessage } from "../helpers";
import { userRef } from "../refs/User";

export async function signup(username: string, email: string, password: string) {
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password)
        const { user } = data
        // save user in db
        const uniqueNumber = await generateUniqueNumber()
        await setDoc(userRef(user.uid), {
            email,
            username,
            uid: user.uid,
            chatGroups: [],
            following: [],
            followers: [],
            uniqueNumber,
            profilePicture: 'https://firebasestorage.googleapis.com/v0/b/chat-app-a5f37.appspot.com/o/profilepictures%2Fimages.png?alt=media&token=d77e1e3d-aff4-4e63-8532-12606736f3dc'
        })

        return null
    } catch (error: unknown) {
        const message: string = getErrorMessage(error)
        return message
    }
}

export async function signin(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        return null
    } catch (error: unknown) {
        const message: string = getErrorMessage(error)
        return message
    }
}

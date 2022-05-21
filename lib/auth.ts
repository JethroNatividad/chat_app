import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { auth } from "./firebase";
import { getErrorMessage } from "./helpers";
import { userRef } from "./refs/User";

export async function signup(username: string, email: string, password: string) {
    try {
        const data = await createUserWithEmailAndPassword(auth, email, password)
        const { user } = data
        // save user in db
        await setDoc(userRef(user.uid), {
            email,
            username,
            uid: user.uid,
            chatGroups: [],
            following: [],
            followers: [],
        })

        return null
    } catch (error: unknown) {
        const message: string = getErrorMessage(error)
        return message
    }
}
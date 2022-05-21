import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getDoc, setDoc } from "firebase/firestore"
import { auth } from "../firebase"
import { getErrorMessage } from "../helpers"
import { userRef } from "../refs/User"

export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        // get user in db, if not exist, create it
        const { user } = result
        const userData = await getDoc(userRef(user.uid))
        if (!userData.exists && user.email && user.displayName) {
            await setDoc(userRef(user.uid), {
                email: user.email,
                username: user.displayName,
                uid: user.uid,
                chatGroups: [],
                following: [],
                followers: [],
            })
        }
        return null
    } catch (error: unknown) {
        const message: string = getErrorMessage(error)
        return message
    }
}
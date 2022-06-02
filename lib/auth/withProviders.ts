import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getDoc, setDoc } from "firebase/firestore"
import { auth } from "../firebase"
import { generateUniqueNumber, getErrorMessage } from "../helpers"
import { userRef } from "../refs/User"

export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider()
        console.log("Logging in")
        const result = await signInWithPopup(auth, provider)
        console.log("Logged in, getting user")
        // get user in db, if not exist, create it
        const { user } = result
        const userData = await getDoc(userRef(user.uid))
        if (!userData.exists) {
            console.log("No user found, creating user")
            const uniqueNumber = await generateUniqueNumber()
            await setDoc(userRef(user.uid), {
                email: user.email || '',
                username: user.displayName || 'User',
                uid: user.uid,
                chatGroups: [],
                following: [],
                followers: [],
                uniqueNumber
            })
        console.log("User created")
        return null
        }
        console.log("User found, login success", userData.data())

        return null
    } catch (error: unknown) {
        const message: string = getErrorMessage(error)
        return message
    }
}
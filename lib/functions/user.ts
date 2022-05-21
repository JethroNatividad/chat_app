import { getDoc, updateDoc } from "firebase/firestore"
import { auth } from "../firebase"
import { userRef } from "../refs/User"

export const addFriend = async (userId: string) => {
    // check if there is current user
    if (!auth.currentUser) return
    if (userId === auth.currentUser.uid) return

    // get user to add and current user data
    const userToAdd = (await getDoc(userRef(userId))).data()
    const currentUser = (await getDoc(userRef(auth.currentUser.uid))).data()

    if (!userToAdd || !currentUser) return

    // check if user is already in current user's following list
    if (currentUser.following.includes(userId)) return
    currentUser.following.push(userId)
    await updateDoc(userRef(auth.currentUser.uid), currentUser)

    // check if current user is already in user to add's followers list
    if (userToAdd.followers.includes(auth.currentUser.uid)) return
    userToAdd.followers.push(auth.currentUser.uid)
    await updateDoc(userRef(userId), userToAdd)

}
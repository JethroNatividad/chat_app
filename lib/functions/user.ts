import { getDoc, updateDoc } from "firebase/firestore"
import { User } from "../../types/User"
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

export const removeFriend = async (userId: string) => {
    // check if there is current user
    if (!auth.currentUser) return
    if (userId === auth.currentUser.uid) return
    const currentUid = auth.currentUser.uid

    // get user to remove and current user data
    const userToRemove = (await getDoc(userRef(userId))).data()
    const currentUser = (await getDoc(userRef(currentUid))).data()

    if (!userToRemove || !currentUser) return

    // check if user is already not in current user's following list
    if (!currentUser.following.includes(userId)) return
    currentUser.following = currentUser.following.filter(id => id !== userId)
    await updateDoc(userRef(currentUid), currentUser)

    // check if current user is already not in user to remove's followers list
    if (!userToRemove.followers.includes(currentUid)) return
    userToRemove.followers = userToRemove.followers.filter(id => id !== currentUid)
    await updateDoc(userRef(userId), userToRemove)
}

export const getUserFriends = async (following: string[], followers: string[]) => {
    const friendIds: string[] = []
    let followingIds: string[] = following
    let followersIds: string[] = followers

    following.forEach((followingId: string) => {
        followers.forEach((followerId: string) => {
            if (followingId === followerId) {
                friendIds.push(followingId)
                // remove in case of duplicates
                followingIds = followingIds.filter(id => id !== followingId)
                followersIds = followersIds.filter(id => id !== followerId)
            }
        })
    })
    const friends = friendIds.map(async (friendId: string) => {
        const friend = (await getDoc(userRef(friendId))).data()
        if (friend) return friend
    })
    const followingUsers = followingIds.map(async (followingId: string) => {
        const user = (await getDoc(userRef(followingId))).data()
        if (user) return user
    })
    const followersUsers = followersIds.map(async (followerId: string) => {
        const user = (await getDoc(userRef(followerId))).data()
        if (user) return user
    })

    return {
        friends,
        incomingRequests: followersUsers,
        outgoingRequests: followingUsers
    }

}
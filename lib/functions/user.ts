import { contains } from "@firebase/util"
import { getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { User } from "../../types/User"
import { auth } from "../firebase"
import { userRef, usersRef } from "../refs/User"

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

export const searchUsers = async (search: string) => {
    // search for every user that contains the search string in their name
    const q = query(usersRef, where('username', '>=', search), where('username', '<=', `${search}\uf8ff`))
    const res: User[] = []
    const users = (await getDocs(q)).forEach(user => {
        if (user.data()) res.push(user.data())
    })
    return res
}

export const populateUserId = async (userId: string) => {
    const user = (await getDoc(userRef(userId))).data()
    if (!user) return null
    return user
}

export const populateUserIds = async (userIds: string[]) => {
    const users: User[] = []
    userIds.forEach(
        async (userId) => {
            const user = await populateUserId(userId)
            if (user) users.push(user)
        }
    )
    return users
}
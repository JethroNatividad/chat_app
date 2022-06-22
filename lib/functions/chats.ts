import { addDoc, getDoc, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { ChatGroup, ChatGroupWithoutId, Message, RecentMessage } from "../../types/Chats"
import { auth } from "../firebase"
import { chatGroupRef, chatGroupsRef, messagesRef } from "../refs/Chats"
import { userRef } from "../refs/User"
import { populateUserId } from "./user"

export const populateChatGroups = async (chatGroupIds: string[]) => {
    const chatGroups: ChatGroup[] = []
    chatGroupIds.forEach(async (chatGroupId: string) => {
        const chatGroup = (await getDoc(chatGroupRef(chatGroupId))).data()
        if (chatGroup) chatGroups.push(chatGroup)
    })
    return chatGroups
}

export const checkIfAlreadyInChatGroup = async (userId: string) => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    // check if the current user and the member is in the same group
    const memberData = await populateUserId(userId)
    if (!memberData) return
    const memberChatGroupIds = memberData.chatGroups
    const memberChatGroupData = await populateChatGroups(memberChatGroupIds)
    const alreadyInGroup = memberChatGroupData.find((chatGroup: ChatGroup) => {
        return chatGroup.members.includes(currentUser.uid)
    })
    if (alreadyInGroup) return alreadyInGroup.id
}

export const createChatGroup = async (members: string[]) => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    const chatGroup: ChatGroup = {
        createdAt: Timestamp.now(),
        createdBy: currentUser.uid,
        members: [...members, currentUser.uid],
        recentMessage: null,
        id: ''
    }
    const chatGroupData = await addDoc(chatGroupsRef, chatGroup)
    await updateDoc(chatGroupData, { id: chatGroupData.id })
    // add the chatgroup to the user's chatgroups
    const currentUserData = (await getDoc(userRef(currentUser.uid))).data()
    if (currentUserData) {
        await updateDoc(userRef(currentUser.uid), { chatGroups: [...currentUserData.chatGroups, chatGroupData.id] })
    }

    members.forEach(async (memberId: string) => {
        const memberData = (await getDoc(userRef(memberId))).data()
        if (memberData) {
            await updateDoc(userRef(memberId), { chatGroups: [...memberData.chatGroups, chatGroupData.id] })
        }
    })
}

export const sendMessage = async (chatGroupId: string, message: string) => {
    const currentUser = auth.currentUser
    if (!currentUser) return
    const messageData: Message = {
        messageText: message,
        sentAt: Timestamp.now(),
        sentBy: currentUser.uid
    }
    await addDoc(messagesRef(chatGroupId), messageData)
    // add to recent message
    const recentMessage: RecentMessage = {
        ...messageData,
        readBy: [currentUser.uid]
    }
    await updateDoc(chatGroupRef(chatGroupId), { recentMessage: recentMessage })
}
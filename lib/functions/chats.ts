import { addDoc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { ChatGroup, ChatGroupWithoutId, Message, RecentMessage } from "../../types/Chats"
import { auth } from "../firebase"
import { chatGroupRef, chatGroupsRef, messagesRef } from "../refs/Chats"

export const populateChatGroups = async (chatGroupIds: string[]) => {
    const chatGroups = chatGroupIds.map(async (chatGroupId: string) => {
        const chatGroup = (await getDoc(chatGroupRef(chatGroupId))).data()
        if (chatGroup) return chatGroup
    })
    return chatGroups
}

export const createChatGroup = async (members: string[]) => {
    const currentUser = auth.currentUser
    if (!currentUser) return
    const chatGroup: ChatGroup = {
        createdAt: serverTimestamp(),
        createdBy: currentUser.uid,
        members,
        recentMessage: null,
        id: ''
    }
    const data = await addDoc(chatGroupsRef, chatGroup)
    await updateDoc(data, { id: data.id })
}

export const sendMessage = async (chatGroupId: string, message: string) => {
    const currentUser = auth.currentUser
    if (!currentUser) return
    const messageData: Message = {
        messageText: message,
        sentAt: serverTimestamp(),
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
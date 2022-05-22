import { addDoc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { ChatGroup, ChatGroupWithoutId } from "../../types/Chats"
import { chatGroupRef, chatGroupsRef } from "../refs/Chats"

export const populateChatGroups = async (chatGroupIds: string[]) => {
    const chatGroups = chatGroupIds.map(async (chatGroupId: string) => {
        const chatGroup = (await getDoc(chatGroupRef(chatGroupId))).data()
        if (chatGroup) return chatGroup
    })
    return chatGroups
}

export const createChatGroup = async (createdBy: string, members: string[]) => {
    const chatGroup: ChatGroup = {
        createdAt: serverTimestamp(),
        createdBy,
        members,
        recentMessage: null,
        id: ''
    }
    const data = await addDoc(chatGroupsRef, chatGroup)
    await updateDoc(data, { id: data.id })
}
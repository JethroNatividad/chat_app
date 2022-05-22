import { getDoc } from "firebase/firestore"
import { chatGroupRef } from "../refs/Chats"

export const populateChatGroups = async (chatGroupIds: string[]) => {
    const chatGroups = chatGroupIds.map(async (chatGroupId: string) => {
        const chatGroup = (await getDoc(chatGroupRef(chatGroupId))).data()
        if (chatGroup) return chatGroup
    })
    return chatGroups
}
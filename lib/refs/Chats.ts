import { doc } from 'firebase/firestore'
import { ChatGroup, Message } from '../../types/Chats'
import { createCollection } from '../firebase'

export const chatGroupsRef = createCollection<ChatGroup>('chatGroups')

export const messagesRef = (chatGroupId: string) => {
    // return chatGroupsRef.doc(chatGroupId).collection('messages');
    return createCollection<Message>(`messages/${chatGroupId}/message`)
}

export const chatGroupRef = (chatGroupId: string) => {
    return doc(chatGroupsRef, chatGroupId)
}

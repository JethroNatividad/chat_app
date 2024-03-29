import { FieldValue, Timestamp } from "firebase/firestore"
import { User } from "./User"

export type Message = {
    messageText: string
    sentAt: Timestamp
    sentBy: string
}

export type PopulatedMessage = Omit<Message, 'sentBy'> & {
    sentBy: User | null
}

export type RecentMessage = Message & {
    readBy: string[]
}

export type ChatGroup = {
    id: string
    createdAt: Timestamp
    createdBy: string
    members: string[]
    recentMessage: RecentMessage | null
}
export type PopulatedChatGroup = Omit<ChatGroup, 'members'> & {
    members: User[]
}

export type ActiveChat = {
    id: string
    messages: PopulatedMessage[],
    members: User[]
}

// create type of chatgroup without id
export type ChatGroupWithoutId = Omit<ChatGroup, 'id'>

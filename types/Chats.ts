import { FieldValue } from "firebase/firestore"
import { User } from "./User"

export type Message = {
    messageText: string
    sentAt: FieldValue
    sentBy: string
}

export type RecentMessage = Message & {
    readBy: string[]
}

export type ChatGroup = {
    id: string
    createdAt: FieldValue
    createdBy: string
    members: string[]
    recentMessage: RecentMessage | null
}
export type PopulatedChatGroup = Omit<ChatGroup, 'members'> & {
    members: User[]
}
// create type of chatgroup without id
export type ChatGroupWithoutId = Omit<ChatGroup, 'id'>

import { Timestamp } from "firebase/firestore"
import { User } from "./User"

export type Message = {
    messageText: string
    sentAt: Timestamp
    sentBy: string
}

export type RecentMessage = Message & {
    readBy: string[]
}

export type ChatGroup = {
    id: string
    createdAt: Timestamp
    createdBy: string
    members: User[]
    recentMessage: RecentMessage | null
}
// export type PopulatedChatGroup = Omit<ChatGroup, 'members'> & {
//     members: User[]
// }
// create type of chatgroup without id
export type ChatGroupWithoutId = Omit<ChatGroup, 'id'>

import { FieldValue } from "firebase/firestore"

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


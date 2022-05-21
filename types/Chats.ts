import { FieldValue } from "firebase/firestore"

export type RecentMessage = {
    sentBy: string
    sentAt: FieldValue
    messageText: string
    readBy: string[]
}

export type ChatGroup = {
    id: string
    createdAt: FieldValue
    createdBy: string
    members: string[]
    recentMessage: RecentMessage
}


import { ChatGroup, Message } from "../../types/Chats";
import { createCollection } from "../helpers";

export const chatGroupsRef = createCollection<ChatGroup>('chatGroups');

export const messagesRef = (chatGroupId: string) => {
    // return chatGroupsRef.doc(chatGroupId).collection('messages');
    return createCollection<Message>(`messages/${chatGroupId}/message`);
}
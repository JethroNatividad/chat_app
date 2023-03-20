import { createContext, useState, useEffect, useContext } from 'react'
import { useAuth } from './AuthContext';
import { PopulatedChatGroup } from '../types/Chats';
import { onSnapshot, Unsubscribe } from 'firebase/firestore';
import { chatGroupRef } from '../lib/refs/Chats';
import { User } from '../types/User';
import { populateUserId } from '../lib/functions/user';
interface IChatContext {
    activeChat: any;
    setActiveChat: (value: any) => void;
    chatList: PopulatedChatGroup[];
    chatListLoading: boolean;
}

const ChatContext = createContext<IChatContext>({
    activeChat: null,
    setActiveChat: () => { },
    chatList: [],
    chatListLoading: true,
})

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, userLoading } = useAuth();
    const [activeChat, setActiveChat] = useState<any>(null);
    const [chatList, setChatList] = useState<PopulatedChatGroup[]>([]);
    const [chatListLoading, setChatListLoading] = useState<boolean>(true);

    useEffect(() => {
        // do something when active chat changes
    }, [activeChat]);

    useEffect(() => {
        const cleanupFunctions: Unsubscribe[] = [];

        const getChatList = async () => {
            if (user && !userLoading) {
                const chatGroups = user.chatGroups;

                for (const chatGroupId of chatGroups) {
                    const unsubscribe = onSnapshot(chatGroupRef(chatGroupId), async (snapshot) => {
                        const data = snapshot.data();
                        if (data) {
                            const members: User[] = [];
                            for (const id of data.members) {
                                const member = await populateUserId(id);
                                if (member) {
                                    members.push(member);
                                }
                            }

                            const populatedData = { ...data, members };
                            console.log("DATA", populatedData)

                            setChatList((prevChatList) => {
                                const chatGroupIndex = prevChatList.findIndex((chatGroup) => chatGroup.id === populatedData.id);
                                if (chatGroupIndex !== -1) {
                                    const newChatList = [...prevChatList];
                                    newChatList[chatGroupIndex] = populatedData;
                                    return newChatList;
                                }
                                return [...prevChatList, populatedData];

                            });
                        }
                    })
                    cleanupFunctions.push(unsubscribe);
                }

                // setChatList(populatedChatGroups);
                if (chatListLoading) {
                    setChatListLoading(false);
                }
            }
        };

        getChatList();

        return () => {
            cleanupFunctions.forEach((unsubscribe) => {
                unsubscribe();
            });
        };
    }, [user, userLoading]);

    return (
        <ChatContext.Provider value={{ activeChat, setActiveChat, chatList, chatListLoading }}>
            {children}
        </ChatContext.Provider>
    );
};

export function useChat() {
    return useContext(ChatContext);
}

export default ChatProvider
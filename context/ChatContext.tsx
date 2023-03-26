import { createContext, useState, useEffect, useContext } from 'react'
import { useAuth } from './AuthContext';
import { ActiveChat, Message, PopulatedChatGroup } from '../types/Chats';
import { onSnapshot, orderBy, query, Unsubscribe } from 'firebase/firestore';
import { chatGroupRef, messagesRef } from '../lib/refs/Chats';
import { User } from '../types/User';
import { populateUserId } from '../lib/functions/user';
interface IChatContext {
    activeChatId: string | null;
    activeChat: ActiveChat | null;
    activeChatLoading: boolean;
    setActiveChatId: (value: string | null) => void;
    chatList: PopulatedChatGroup[];
    chatListLoading: boolean;
}

const ChatContext = createContext<IChatContext>({
    activeChatId: null,
    activeChat: null,
    activeChatLoading: false,
    setActiveChatId: () => { },
    chatList: [],
    chatListLoading: true,
})

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, userLoading } = useAuth();
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [activeChat, setActiveChat] = useState<ActiveChat | null>(null);
    const [activeChatLoading, setActiveChatLoading] = useState<boolean>(true);
    const [chatList, setChatList] = useState<PopulatedChatGroup[]>([]);
    const [chatListLoading, setChatListLoading] = useState<boolean>(true);

    useEffect(() => {
        // do something when active chat changes
        const cleanupFunctions: Unsubscribe[] = [];
        const getMessages = async () => {
            if (activeChatId) {
                const unsubscribe = onSnapshot(query(messagesRef(activeChatId), orderBy("sentAt", "asc")),
                    (snapshot) => {
                        const data = snapshot.docs.map((doc) => doc.data() as Message);
                        setActiveChat((prev) => {
                            if (prev) {
                                return { ...prev, messages: data }
                            }
                            return { id: activeChatId, messages: data }
                        });

                        if (activeChatLoading) {
                            setActiveChatLoading(false);
                        }
                    });
                cleanupFunctions.push(unsubscribe);
            }
        }
        return () => {
            cleanupFunctions.forEach((unsubscribe) => {
                unsubscribe();
            });
        };
    }, [activeChatId]);

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
        <ChatContext.Provider value={{ activeChatId, activeChat, activeChatLoading, setActiveChatId, chatList, chatListLoading }}>
            {children}
        </ChatContext.Provider>
    );
};

export function useChat() {
    return useContext(ChatContext);
}

export default ChatProvider
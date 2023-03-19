import { createContext, useState, useEffect, useContext } from 'react'
import { useAuth } from './AuthContext';
import { PopulatedChatGroup } from '../types/Chats';
import { onSnapshot } from 'firebase/firestore';
import { chatGroupRef } from '../lib/refs/Chats';
import { User } from '../types/User';
import { populateUserId } from '../lib/functions/user';
interface IChatContext {
    activeChat: any;
    setActiveChat: (value: any) => void;
    chatList: any;
}

const ChatContext = createContext<IChatContext>({
    activeChat: null,
    setActiveChat: () => { },
    chatList: null,
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
        const getChatList = async () => {
            if (user && !userLoading) {
                const chatGroups = user.chatGroups;
                const populatedChatGroups: PopulatedChatGroup[] = [];

                for (const chatGroupId of chatGroups) {
                    const unsubscribe = onSnapshot(chatGroupRef(chatGroupId), async (snapshot) => {
                        const data = snapshot.data();

                        if (data) {
                            const members: User[] = [];
                            data.members.forEach(async (id) => {
                                const member = await populateUserId(id);
                                if (member) {
                                    members.push(member);
                                }
                            });

                            const populatedData = { ...data, members };
                            populatedChatGroups.push(populatedData);
                            setChatList(populatedChatGroups);
                        }
                    });

                    return () => {
                        unsubscribe();
                    };
                }

                if (chatListLoading) {
                    setChatListLoading(false);
                }
            }
        };

        getChatList();
    }, [user, userLoading]);


    return (
        <ChatContext.Provider value={{ activeChat, setActiveChat, chatList }}>
            {children}
        </ChatContext.Provider>
    );
};

export function useChat() {
    return useContext(ChatContext);
}

export default ChatProvider
import { createContext, useState, useEffect, useContext } from 'react'

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
    const [activeChat, setActiveChat] = useState<any>(null);
    const [chatList, setChatList] = useState<any>(null);

    useEffect(() => {
        // do something when active chat changes
    }, [activeChat]);

    useEffect(() => {
        // Listener to get chat list

    }, []);

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
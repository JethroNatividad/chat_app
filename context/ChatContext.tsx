import { createContext, useState, useEffect, useContext } from 'react'

interface IChatContext {
    activeChat: any;
    setActiveChat: (value: any) => void;
}

const ChatContext = createContext<IChatContext>({
    activeChat: null,
    setActiveChat: () => { }
})

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeChat, setActiveChat] = useState<any>(null);

    useEffect(() => {
        // do something when active chat changes
    }, [activeChat]);

    return (
        <ChatContext.Provider value={{ activeChat, setActiveChat }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider
import { Box, Flex, Icon, IconButton, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React from 'react'
import { useChat } from '../context/ChatContext'
import { RxChevronLeft } from 'react-icons/rx'
import Message, { MessageSkeleton } from './Message'
import { AiOutlineSend } from 'react-icons/ai'
const ChatView = () => {
    const { activeChat, setActiveChatId } = useChat()
    const memberNames = activeChat?.members.map((member) => member.username).join(', ')

    return (
        <Flex flexDirection='column' h='full'>
            <Flex alignItems='center' px='5' shadow='lg' minH='14'>
                <div
                    className='flex md:hidden text-white cursor-pointer'
                    onClick={() => setActiveChatId(null)}
                >
                    <IconButton
                        icon={<RxChevronLeft />}
                        variant='outline'
                        colorScheme='teal'
                        aria-label='Settings'
                        fontSize='25'
                    />
                </div>
                <Text className='px-5 md:px-5' fontSize='xl'>
                    {memberNames}
                </Text>
            </Flex>
            <Box flex={1}>
                {activeChat !== null ? (
                    activeChat.messages.map((message, i) => (
                        <Message key={message.messageText + message.sentAt + i} message={message.messageText} timestamp={message.sentAt} sentBy={message.sentBy} />
                    ))
                ) : (
                    <>
                        {[...Array(6)].map((_, i) => (
                            <MessageSkeleton key={i} />
                        ))}
                    </>
                )}
            </Box>
            <Box px='3' my='3'>
                <form autoComplete='false'>
                    <InputGroup>
                        <InputRightElement
                            pointerEvents='all'
                        >
                            <Icon cursor='pointer' as={AiOutlineSend} />
                        </InputRightElement>
                        <Input focusBorderColor='teal.300' />
                    </InputGroup>
                </form>
            </Box>
        </Flex>
    )
}

export default ChatView
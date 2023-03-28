import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { useChat } from '../context/ChatContext'
import { RxChevronLeft } from 'react-icons/rx'

type Props = {}

const ChatView = (props: Props) => {
    const { activeChat, activeChatLoading, chatList, setActiveChatId } = useChat()
    const memberNames = activeChat?.members.map((member) => member.username).join(", ");

    return (
        <Box>
            <Flex alignItems="center" px='5' shadow='lg' minH="14">
                <div
                    className="flex md:hidden text-white cursor-pointer"
                    onClick={() => setActiveChatId(null)}
                >
                    <IconButton
                        icon={<RxChevronLeft />}
                        variant="outline"
                        colorScheme="teal"
                        aria-label="Settings"
                        fontSize='25'
                    />
                </div>
                <Text className='px-5 md:px-5' fontSize="xl">
                    {memberNames}
                </Text>
            </Flex>
        </Box>
    )
}

export default ChatView
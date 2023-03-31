import { Flex, Image, Text } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';
import React from 'react'
import { User } from '../types/User';

type Props = {
    timestamp: Timestamp;
    message: string;
    sentBy: User | null;
}

const Message = ({ sentBy, message, timestamp }: Props) => {
    return (
        <Flex>
            {sentBy && (
                <Image
                    borderRadius="full"
                    boxSize="46px"
                    src={sentBy.profilePicture}
                    alt="Profile Picture"
                    mr="3"
                />
            )}
            <Flex>
                <Flex alignItems="center">
                    <Text fontSize="lg" pr="2">{sentBy && sentBy.username}</Text>
                    <Text fontSize="xs" color="slategray">{moment(timestamp.toDate()).calendar()}</Text>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default Message
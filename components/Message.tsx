import { Box, Flex, Image, SkeletonCircle, Text } from '@chakra-ui/react';
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
        <Flex px='5' py='1'>
            {sentBy ? (
                <Image
                    borderRadius='full'
                    boxSize='46px'
                    src={sentBy.profilePicture}
                    alt='Profile Picture'
                    mr='3'
                />
            ) : (
                <SkeletonCircle size='12' />
            )}
            <Box>
                <Flex alignItems='center'>
                    <Text fontSize='lg' pr='2'>{sentBy ? sentBy.username : 'Unknown'}</Text>
                    <Text fontSize='xs' color='slategray'>{moment(timestamp.toDate()).calendar()}</Text>
                </Flex>
                <Text color='gray.300'>{message}</Text>
            </Box>
        </Flex>
    )
}

export default Message
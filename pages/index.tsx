import type { NextPage } from 'next';
import Head from 'next/head';
import ChatView from '../components/ChatView';
import { Box, Flex } from '@chakra-ui/react';
import UserInfoBar from '../components/UserInfoBar';
import ChatList from '../components/ChatList';
import { useChat } from '../context/ChatContext';
import React from 'react';

const Home: NextPage = () => {
	const { activeChatId } = useChat()
	return (
		<div>
			<Head>
				<title>Chat App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Box h='100vh' display='flex'>
				<Box
					minW={'sm'}
					w={{ base: 'full', md: '40%' }}
					h='full'
					position={{ base: 'fixed', md: 'relative' }}
					top={0}
					left={0}
					className={`transition-transform duration-300 ${activeChatId !== null ? '-translate-x-full' : 'translate-x-0'
						} md:translate-x-0`}
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					zIndex={10}
				>
					<Box>
						<ChatList />
					</Box>
					<UserInfoBar />
				</Box>
				<Box
					w={{ base: 'full' }}
					h='full'
					position={{ base: 'fixed', md: 'relative' }}
					top={0}
					left={0}
					bg='blackAlpha.400'
					className={`transition-transform duration-300 ${activeChatId !== null ? 'translate-x-0' : 'translate-x-full'
						} md:translate-x-0`}
				>
					{
						activeChatId !== null ? <ChatView /> : (
							<Flex w='full' h='full' justifyContent='center' alignItems='center'>Open or start a new conversation</Flex>
						)
					}
				</Box>
			</Box>
		</div>
	);
};

export default Home;

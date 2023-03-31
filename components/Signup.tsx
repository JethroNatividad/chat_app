import { Formik } from 'formik'
import React from 'react'
import NextLink from 'next/link'
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
	useToast,
	Divider,
	Icon,
} from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import { getErrorMessage } from '../lib/helpers'
import { FcGoogle } from 'react-icons/fc'

const Signup = () => {
	const { register, loginWithGoogle } = useAuth()
	const toast = useToast()
	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={4} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Create your new account</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						😎👍 Chat with anyone, anywhere.
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={4}
				>
					<Formik
						initialValues={{ username: '', email: '', password: '' }}
						onSubmit={async (fieldValues, { setSubmitting }) => {
							try {
								setSubmitting(true)
								await register(fieldValues)
								toast({
									title: 'Welcome back!',
									status: 'success',
									isClosable: true,
								})
							} catch (error: unknown) {
								const message: string = getErrorMessage(error)
								toast({
									title: message,
									status: 'error',
									isClosable: true,
								})
							}
							setSubmitting(false)
						}}
					>
						{({
							values,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
							/* and other goodies */
						}) => (
							<form
								className='flex flex-col w-full p-5 space-y-3 '
								onSubmit={handleSubmit}
							>
								<Stack spacing={4}>
									<FormControl isRequired id='username'>
										<FormLabel>Username</FormLabel>
										<Input
											required
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.username}
											type='text'
											name='username'
										/>
									</FormControl>
									<FormControl isRequired id='email'>
										<FormLabel>Email address</FormLabel>
										<Input
											required
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
											type='email'
											name='email'
										/>
									</FormControl>
									<FormControl isRequired id='password'>
										<FormLabel>Password</FormLabel>
										<Input
											required
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password}
											name='password'
											type='password'
										/>
									</FormControl>
									<Stack spacing={10}>
										<Stack
											direction={{ base: 'column', sm: 'row' }}
											align={'start'}
										>
											{/* <NextLink as={}></NextLink> */}
											<Text>Already have an account? </Text>
											<NextLink href='login' passHref>
												<Link color={'blue.400'}>Login</Link>
											</NextLink>
										</Stack>
										<Button
											bg={'blue.400'}
											color={'white'}
											_hover={{
												bg: 'blue.500',
											}}
											isLoading={isSubmitting}
											type='submit'
										>
											Create account
										</Button>
										<Divider orientation='horizontal' />
										<Button
											leftIcon={<Icon as={FcGoogle} />}
											bg={'white'}
											color={'gray.700'}
											_hover={{
												bg: 'white',
											}}
											onClick={async () => {
												try {
													await loginWithGoogle()
													toast({
														title: 'Welcome back!',
														status: 'success',
														isClosable: true,
													})
												} catch (error: unknown) {
													const message: string = getErrorMessage(error)
													toast({
														title: message,
														status: 'error',
														isClosable: true,
													})
												}
											}}
										>
											Sign in with Google
										</Button>
									</Stack>
								</Stack>
							</form>
						)}
					</Formik>
				</Box>
			</Stack>
		</Flex>
	)
}

export default Signup

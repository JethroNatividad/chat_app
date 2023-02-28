import { signOut } from "firebase/auth";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
// import { toast } from 'react-toastify'
import { signin } from "../lib/auth";
import { signInWithGoogle } from "../lib/auth/withProviders";
import { auth } from "../lib/firebase";
import NextLink from "next/link";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

type Props = {};

const Login = (props: Props) => {
	const router = useRouter();
	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>Sign in to your account</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						😎👍 Chat with anyone, anywhere.
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Formik
						initialValues={{ email: "", password: "" }}
						onSubmit={async (
							{ email, password },
							{ setSubmitting, setFieldValue }
						) => {
							setSubmitting(true);
							const error = await signin(email, password);
							if (error) {
								setSubmitting(false);
								// return toast.error(error)
							}
							// toast.success("Welcome back")
							setSubmitting(false);
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
								className="flex flex-col w-full p-5 space-y-3 "
								onSubmit={handleSubmit}
							>
								<Stack spacing={4}>
									<FormControl id="email">
										<FormLabel>Email address</FormLabel>
										<Input
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
											type="email"
											name="email"
										/>
									</FormControl>
									<FormControl id="password">
										<FormLabel>Password</FormLabel>
										<Input
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password}
											name="password"
											type="password"
										/>
									</FormControl>
									<Stack spacing={10}>
										<Stack
											direction={{ base: "column", sm: "row" }}
											align={"start"}
											justify={"space-between"}
										>
											{/* <NextLink as={}></NextLink> */}
											<NextLink href="signup" passHref>
												<Link color={"blue.400"}>Create an account</Link>
											</NextLink>
										</Stack>
										<Button
											bg={"blue.400"}
											color={"white"}
											_hover={{
												bg: "blue.500",
											}}
											isLoading={isSubmitting}
										>
											Sign in
										</Button>
									</Stack>
								</Stack>
							</form>
						)}
					</Formik>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Login;

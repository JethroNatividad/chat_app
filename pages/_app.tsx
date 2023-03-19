import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthProvider from "../context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "../context/ChatContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<AuthProvider>
				<ChatProvider>
					<Component {...pageProps} />
				</ChatProvider>
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;

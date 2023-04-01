/* eslint-disable @typescript-eslint/no-empty-function */
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'
import { onSnapshot, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { createContext, useState, useEffect, useContext } from 'react'
import { createUserFromProvider } from '../lib/auth/withProviders'
import { auth } from '../lib/firebase'
// import { populateUserId } from '../lib/functions/user'
import { generateUniqueNumber, getErrorMessage } from '../lib/helpers'
import { userRef } from '../lib/refs/User'
import { User } from '../types/User'
import React from 'react'

type LoginParams = {
	email: string;
	password: string;
};
type RegisterParams = {
	username: string;
	email: string;
	password: string;
};
interface IAuthContext {
	user: User | null;
	login: (params: LoginParams) => Promise<void>;
	loginWithGoogle: () => Promise<void>;
	logout: () => Promise<void>;
	register: (params: RegisterParams) => Promise<void>;
	userLoading: boolean;
}
const AuthContext = createContext<IAuthContext>({
	user: null,
	login: async () => { },
	loginWithGoogle: async () => { },
	logout: async () => { },
	register: async () => { },
	userLoading: true
})

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null)
	const [userLoading, setUserLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
			if (!user) return router.push('/login')

			const unsubscribeUser = onSnapshot(userRef(user.uid), (snapshot) => {
				const userData = snapshot.data()
				if (!userData) return router.push('/login')
				setUser(userData)
				if (userLoading) setUserLoading(false)
			})
			return () => {
				unsubscribeUser()
			}
		})
		return () => {
			unsubscribeAuth()
		}
	}, [router, userLoading])

	async function login({ email, password }: LoginParams) {
		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (error: unknown) {
			const message: string = getErrorMessage(error)
			throw new Error(message)
		}
	}

	async function loginWithGoogle() {
		try {
			const provider = new GoogleAuthProvider()
			const result = await signInWithPopup(auth, provider)
			await createUserFromProvider(result)
		} catch (error) {
			const message: string = getErrorMessage(error)
			throw new Error(message)
		}
	}

	async function register({ username, email, password }: RegisterParams) {
		try {
			const data = await createUserWithEmailAndPassword(auth, email, password)
			const { user } = data
			// save user in db
			const uniqueNumber = await generateUniqueNumber()
			await setDoc(userRef(user.uid), {
				email,
				username,
				uid: user.uid,
				chatGroups: [],
				following: [],
				followers: [],
				uniqueNumber,
				profilePicture:
					'https://firebasestorage.googleapis.com/v0/b/chat-app-a5f37.appspot.com/o/profilepictures%2Fimages.png?alt=media&token=d77e1e3d-aff4-4e63-8532-12606736f3dc',
			})
		} catch (error: unknown) {
			const message: string = getErrorMessage(error)
			throw new Error(message)
		}
	}

	async function logout() {
		await signOut(auth)
	}

	return (
		<AuthContext.Provider
			value={{ user, login, loginWithGoogle, logout, register, userLoading }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider

export function useAuth() {
	return useContext(AuthContext)
}

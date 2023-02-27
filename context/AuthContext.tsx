import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc } from 'firebase/firestore'
import { createContext, useState, useEffect, useContext } from 'react'
import { auth } from '../lib/firebase'
import { generateUniqueNumber, getErrorMessage } from '../lib/helpers'
import { userRef } from '../lib/refs/User'


const AuthContext = createContext({
    user: null,
    login: async (email: string, password: string) => {},
    logout: async () => {},
    register: async (username: string, email: string, password: string) => {},
    userLoading: true,
})

const AuthProvider:React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userLoading, setUserLoading] = useState(true)


    useEffect(() => {
        
    }, [])

    async function login(email: string, password: string) {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error: unknown) {
            const message: string = getErrorMessage(error)
            throw new Error(message)
        }
    }

    async function register(username: string, email: string, password: string) {
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
                profilePicture: 'https://firebasestorage.googleapis.com/v0/b/chat-app-a5f37.appspot.com/o/profilepictures%2Fimages.png?alt=media&token=d77e1e3d-aff4-4e63-8532-12606736f3dc'
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
        <AuthContext.Provider value={ { user, login, logout, register, userLoading } }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider

export function useAuth() {
    return useContext(AuthContext)
}
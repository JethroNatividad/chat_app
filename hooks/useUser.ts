import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth } from "../lib/firebase"
import { userRef } from "../lib/refs/User"
import { User } from "../types/User"

type Props = {}

const useUser = (props: Props) => {
    const [user, setUser] = useState<User | null>(null)
    const currentUser = auth.currentUser

    useEffect(() => {
        if (currentUser) {
            const unsubscribe = onSnapshot(userRef(currentUser.uid), (snapshot) => {
                const userData = snapshot.data()
                if (!userData) return setUser(null)
                setUser(userData)
            })
            return () => {
                unsubscribe()
            }
        }
    }, [currentUser])

    return user
}

export default useUser
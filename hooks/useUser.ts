import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth } from "../lib/firebase"
import { userRef } from "../lib/refs/User"
import { User } from "../types/User"


const useUser = () => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            if (user) {
                const unsubscribe = onSnapshot(userRef(user.uid), (snapshot) => {
                    const userData = snapshot.data()
                    if (!userData) return setUser(null)
                    setUser(userData)
                })
                return () => {
                    unsubscribe()
                }
            }
        })
        return () => {
            unsub()
        }
    }, [])

    return user
}

export default useUser
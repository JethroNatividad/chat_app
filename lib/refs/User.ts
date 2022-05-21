import { doc } from "firebase/firestore";
import { User } from "../../types/User";
import { createCollection } from "../helpers";

export const usersRef = createCollection<User>('users')

export const userRef = (uid: string) => {
    return doc(usersRef, uid)
}

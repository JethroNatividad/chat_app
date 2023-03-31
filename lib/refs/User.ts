import { doc } from 'firebase/firestore';
import { LastUniqueNumber, User } from '../../types/User';
import { createCollection } from '../firebase';

export const usersRef = createCollection<User>('users')

export const userRef = (uid: string) => {
    return doc(usersRef, uid)
}

export const lastUniqueNumberRef = doc(createCollection<LastUniqueNumber>('lastUniqueNumber'), 'LastUniqueNumber')
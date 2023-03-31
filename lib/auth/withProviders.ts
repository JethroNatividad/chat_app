import { UserCredential } from 'firebase/auth';
import { getDoc, setDoc } from 'firebase/firestore';
import { generateUniqueNumber, getErrorMessage } from '../helpers';
import { userRef } from '../refs/User';

export const createUserFromProvider = async (credentials: UserCredential) => {
	try {
		// get user in db, if not exist, create it
		const { user } = credentials;
		const userData = await getDoc(userRef(user.uid));
		if (!userData.exists()) {
			console.log('No user found, creating user');
			const uniqueNumber = await generateUniqueNumber();
			await setDoc(userRef(user.uid), {
				email: user.email || '',
				username: user.displayName || 'User',
				uid: user.uid,
				chatGroups: [],
				following: [],
				followers: [],
				uniqueNumber,
				profilePicture:
					'https://firebasestorage.googleapis.com/v0/b/chat-app-a5f37.appspot.com/o/profilepictures%2Fimages.png?alt=media&token=d77e1e3d-aff4-4e63-8532-12606736f3dc',
			});
			console.log('User created');
			return null;
		}
		console.log('User found, login success', userData.data());

		return null;
	} catch (error: unknown) {
		const message: string = getErrorMessage(error);
		throw new Error(message);
	}
};

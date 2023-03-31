import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Signup from '../components/Signup';
import { auth } from '../lib/firebase';

type Props = {};

const SignupPage = (props: Props) => {
	const router = useRouter();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) return router.push('/');
		});
		return () => {
			unsubscribe();
		};
	}, [router]);

	return (
		<div>
			<Signup />
		</div>
	);
};

export default SignupPage;

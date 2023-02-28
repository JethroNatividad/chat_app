import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Login from "../components/Login";
import { auth } from "../lib/firebase";

const LoginPage = () => {
	const router = useRouter();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) return router.push("/");
		});
		return () => {
			unsubscribe();
		};
	}, [router]);

	return (
		<div>
			<Login />
		</div>
	);
};

export default LoginPage;

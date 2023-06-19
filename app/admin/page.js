'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Admin = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const isBrowser = () => typeof window !== 'undefined';
	return session ? (
		<div className='flex justify-center items-center p-5 text-blue-500 text-lg font-bold'>
			Welcome to the page for login users
		</div>
	) : isBrowser() ? (
		(window.alert('Sign in, please'), router.push('/'))
	) : null;
};

export default Admin;

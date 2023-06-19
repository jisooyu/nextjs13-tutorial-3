'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@/components/Profile';

const UserProfile = ({ params }) => {
	const searchParams = useSearchParams();
	const userName = searchParams.get('name');

	const [userPosts, setUserPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params?.id}/posts`);
			const data = await response.json();
			setUserPosts(data);
		};

		if (params?.id) fetchPosts();
	}, [params.id]);

	return (
		<Profile
			name={userName}
			desc={` ${userName}가 포스트한 뉴스라서 당신은 수정이나 삭제를 할  수 없습니다.`}
			data={userPosts}
		/>
	);
};

export default UserProfile;

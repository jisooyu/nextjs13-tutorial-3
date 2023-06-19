'use client';

import useSWR from 'swr';
import { useRouter } from 'next/navigation';

import Profile from '@/components/Profile';

// using SWR doc, https://swr.vercel.app/docs/getting-started
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MyProfile = () => {
	const router = useRouter();
	const { data, error } = useSWR('api/prompt', fetcher);
	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};
	const handleDelete = async (post) => {
		const hasConfirmed = confirm('삭제하시겠습니까?');
		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: 'DELETE',
				});
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<Profile
			name='사용자'
			desc='정보를 수정/삭제할 수 있는 페이지'
			data={data}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;

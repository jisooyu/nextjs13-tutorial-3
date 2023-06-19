'use client';

import useSWR from 'swr';
import PromptCard from './PromptCard';

// using SWR doc, https://swr.vercel.app/docs/getting-started
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PromptCardList = ({ data }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const { data, error } = useSWR('api/prompt', fetcher);
	if (error) return <div>Falied to load</div>;
	if (!data) return <div>Loading....</div>;
	return (
		<section>
			<h1>Posts from Users</h1>
			<PromptCardList data={data} />
		</section>
	);
};

export default Feed;

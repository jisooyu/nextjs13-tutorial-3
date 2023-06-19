import Feed from '@/components/Feed';
export const metadata = {
	title: 'NextJS 13 tutorial 3',
	description:
		'nextjs 13 tutorial 3  - displaying, editing, and deleting prompts using next-auth & mongoose',
};

export default function Home() {
	return (
		<main className='feed text-blue-900 font-bold'>
			<h1>Authentication of Next.js using Next-Auth and Mongoose</h1>
			<p>NextJS 13 Tutorial 3 : displaying, editing, and deleting prompts</p>
			<Feed />
		</main>
	);
}

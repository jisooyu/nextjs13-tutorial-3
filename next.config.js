/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ['mongoose'],
	},
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'cdn.dribbble.com',
			'avatars.githubusercontent.com',
		],
	},
	webpack(config) {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		return config;
	},
	async headers() {
		return [
			{
				// matching all API routes
				source: '/api/:path*',
				headers: [
					{ key: 'Cache-Control', value: 'no-cache' },
					{ key: 'Pragma', value: 'no-cache' },
				],
			},
		];
	},
};

module.exports = nextConfig;

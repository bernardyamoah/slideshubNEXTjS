/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
		  {
			source: '/bee.js',
			destination: 'https://cdn.splitbee.io/sb.js',
		  },
		  {
			source: '/_hive/:slug',
			destination: 'https://hive.splitbee.io/:slug',
		  },
		]
	  },
	images: {
		domains: [
			"cloud.appwrite.io",
			"images.unsplash.com",
			"opendoodles.s3-us-west-1.amazonaws.com",
			"media.istockphoto.com",
		],
	},
	// experimental: {
	// 	serverActions: true,
		
	// },
	webpack: (config)=>{
		config.resolve.alias.canvas=false;
		config.resolve.extensionAlias={
			'.js':['.js','jsx','ts','tsx'],
		};
		return config
	}
};

module.exports = nextConfig;

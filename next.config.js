/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"cloud.appwrite.io",
			"images.unsplash.com",
			"opendoodles.s3-us-west-1.amazonaws.com",
			"media.istockphoto.com",
		],
	},
	experimental: {
		serverActions: true,
		
	},
	webpack: (config)=>{
		config.resolve.alias.canvas=false;
		return config
	}
};

module.exports = nextConfig;

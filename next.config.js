/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
	cacheOnFrontEndNav: true,
	reloadOnOnline: true,
	swcMinify: true,
	disable: process.env.NODE_ENV === "development",
	register: true,
	workboxOptions: {
		disableDevLogs: true,
	},
});
const nextConfig = {
	images: {
		domains: [
			"cloud.appwrite.io",
			"images.unsplash.com",
			"opendoodles.s3-us-west-1.amazonaws.com",
			"media.istockphoto.com",
			"youtu.be",
		],
	},
	experimental: {
		serverActions: true,
	},
	webpack: (config) => {
		config.resolve.alias.canvas = false;
		config.resolve.extensionAlias = {
			".js": [".js", "jsx", "ts", "tsx"],
		};
		return config;
	},
};

module.exports = withPWA(nextConfig);

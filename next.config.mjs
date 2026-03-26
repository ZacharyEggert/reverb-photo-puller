// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.reverb.com',
        pathname: '/**',
      },
			{
				protocol: 'https',
				hostname: 'rvb-img.reverb.com',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: '*.reverb.com',
				pathname: '/**'
			}
    ],
  },
};
export default config;

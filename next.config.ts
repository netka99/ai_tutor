// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
// D:\Work\AI_tutor_test_Langchain\ai_tutor\next.config.ts

import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your other Next.js configurations
};

// 1. Pass the path to your new i18n.ts file to the plugin
const withNextIntl = createNextIntlPlugin("./src/i18n.ts"); // <--- CRUCIAL CHANGE HERE!

export default withNextIntl(nextConfig);

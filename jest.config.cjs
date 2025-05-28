// jest.config.cjs
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"^@/(.*)$": "<rootDir>/$1",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testPathIgnorePatterns: ["/node_modules/", "/.next/"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				tsconfig: "tsconfig.json", // make sure your tsconfig supports jsx/react
				useESM: false,            // set false for now unless you configure ESM properly
			},
		],
	},
	testMatch: ["**/__tests__/**/*.(ts|tsx)", "**/?(*.)+(test).(ts|tsx)"],
};

// jest.config.mjs
const config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testPathIgnorePatterns: ['/node_modules/', '/.next/'],
	transform: {
		'^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { 
			configFile: './babel.jest.config.mjs'
		}],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
	transformIgnorePatterns: [
		'/node_modules/(?!(.*\\.mjs$))'
	],
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

export default config;
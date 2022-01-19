import type { Config } from '@jest/types';

// Синхронно загружаемый конфиг
const config: Config.InitialOptions = {
    verbose: true,
    setupFilesAfterEnv: ['@alex_neo/jest-expect-message'],
    reporters: ["default", "jest-stare"],
    testResultsProcessor: "./node_modules/jest-stare"
};
export default config;
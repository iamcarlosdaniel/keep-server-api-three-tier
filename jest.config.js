// jest.config.js (ESM)
export default {
  testEnvironment: "node",
  transform: {},
  //extensionsToTreatAsEsm: [".js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};

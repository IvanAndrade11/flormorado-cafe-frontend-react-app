module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    "\\.(png|jpe?g|gif|svg|webp|mp4|webm|ogg|ogv|mov|woff2?|eot|ttf|otf)$":
      "<rootDir>/src/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
  },
  // .claude/worktrees guarda copias completas del repo que crean las sesiones
  // en segundo plano; sin esto jest corre sus pruebas y choca con sus mocks.
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "<rootDir>/.claude/"],
  modulePathIgnorePatterns: ["<rootDir>/.claude/"],
};

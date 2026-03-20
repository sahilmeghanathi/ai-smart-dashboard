const { execSync } = require("child_process");

const prompt = `
Use .github/prompts/tests.md
Generate tests for current code
`;

// execSync(`gh copilot suggest "${prompt}"`, { stdio: "inherit" });
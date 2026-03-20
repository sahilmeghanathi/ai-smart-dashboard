const { execSync } = require("child_process");

const prompt = `
Use .github/prompts/optimize.md
Optimize current code for performance
`;

// execSync(`gh copilot suggest "${prompt}"`, { stdio: "inherit" });
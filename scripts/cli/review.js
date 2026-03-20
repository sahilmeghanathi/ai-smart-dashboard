const { execSync } = require("child_process");

const prompt = `
Use .github/prompts/review.md
Review the current code changes
`;

// execSync(`gh copilot suggest "${prompt}"`, { stdio: "inherit" });
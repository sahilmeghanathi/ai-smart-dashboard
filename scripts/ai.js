const fs = require("fs");

const command = process.argv[2];

const prompts = {
  review: ".github/prompts/review.md",
  test: ".github/prompts/tests.md",
  optimize: ".github/prompts/optimize.md",
};

if (!prompts[command]) {
  console.log("❌ Invalid command");
  process.exit(1);
}

const content = fs.readFileSync(prompts[command], "utf-8");

console.log(`
===============================
🤖 AI COMMAND: ${command.toUpperCase()}
===============================

👉 Copy below and paste in Copilot Chat:

${content}
`);
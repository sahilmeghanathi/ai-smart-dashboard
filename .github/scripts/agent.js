const fs = require("fs");

async function run() {
  try {
    const res = await fetch("https://ai-smart-dashboard.onrender.com/api/links/top?limit=5");
   
    const data = await res.json();

    const report = `
# 📊 Top Links Report

Generated at: ${new Date().toISOString()}

## Top Links:

${data.data
  .map(
    (link, i) =>
      `${i + 1}. ${link.title} (${link.url}) - ${link.visitCount} visits`
  )
  .join("\n")}
`;

    fs.mkdirSync("reports", { recursive: true });
    fs.writeFileSync("reports/top-links.md", report);

    console.log("Report generated!");
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
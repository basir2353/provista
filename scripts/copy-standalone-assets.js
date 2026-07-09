const fs = require("fs");
const path = require("path");

const standaloneDir = path.join(".next", "standalone");

if (!fs.existsSync(standaloneDir)) {
  // Vercel and other hosted builds don't need standalone asset copying.
  process.exit(0);
}

fs.cpSync("public", path.join(standaloneDir, "public"), { recursive: true });
fs.cpSync(".next/static", path.join(standaloneDir, ".next", "static"), { recursive: true });

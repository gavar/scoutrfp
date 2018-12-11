const fs = require("fs");
const path = require("path");
const ghpages = require("gh-pages");

module.exports = new Promise((resolve, reject) => {
  const basePath = path.join(process.cwd(), "dist");
  const files = [
    "LICENSE",
    "README.md",
  ];

  for (const file of files)
    fs.copyFileSync(file, path.join(basePath, file));

  const config = {
    message: "CI: deploy",
  };

  ghpages.publish(basePath, config, err => {
    if (err) reject(err);
    else resolve();
  });
});

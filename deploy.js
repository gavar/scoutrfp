const path = require("path");
const ghpages = require("gh-pages");

module.exports = new Promise((resolve, reject) => {
  const basePath = path.join(process.cwd(), "dist");
  const config = {
    message: "CI: deploy",
  };

  ghpages.publish(basePath, config, err => {
    if (err) reject(err);
    else resolve();
  });
});

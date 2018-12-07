module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/gitlab-teams/" : "/",
  pages: {
    index: "src/main.js",
    404: "src/404.js"
  }
};

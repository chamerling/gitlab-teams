module.exports = {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL || "/gitlab-teams/"
      : "/"
};

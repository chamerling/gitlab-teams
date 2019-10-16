module.exports = {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL || "/gitlab-teams/"
      : "/",

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};

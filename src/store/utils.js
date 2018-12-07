function normalizePath(url) {
  const result = url
    .toString()
    .replace(/^\/*/, "")
    .replace(/\/*$/, "/");

  return result.length <= 1 ? "" : result;
}

const constants = {
  authenticationMethod: {
    OAUTH: "OAUTH",
    PERSONAL: "PERSONNAL"
  },
  OAUTH_REDIRECT_PATH: "/oauth/redirect"
};

export { normalizePath, constants };

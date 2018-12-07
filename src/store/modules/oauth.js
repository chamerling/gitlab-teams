import { constants, normalizePath } from "@/store/utils";
import Vue from "vue";

function buildURL(...args) {
  if (args.length === 0) {
    return "";
  }

  if (args.length === 1) {
    return normalizePath(args[0].toString());
  }

  const hasParams = typeof args[args.length - 1] === "object";
  const last = hasParams ? args.slice(-1)[0] : {};
  const parts = hasParams ? args.slice(0, args.length - 1) : args;

  const built = [normalizePath(parts[0]), ...parts.slice(1).map(it => normalizePath(it))].join("");
  const parameters = hasParams
    ? `?${Object.keys(last)
        .map(k => `${k}=${last[k]}`)
        .join("&")}`
    : "";

  return built + parameters;
}

const types = {
  UPDATE_OAUTH_CREDENTIALS: "updateOAuthCredentials",
  UPDATE_OAUTH_TOKEN: "updateOAuthToken"
};

const getters = {
  canUseOAuth: state => state.clientId !== undefined,
  accessTokenUri: (_1, _2, rootState) =>
    buildURL(rootState.gitlabInstance, process.env.VUE_APP_OAUTH_ACCESS_TOKEN_PATH),
  authorizationUri(state, _, rootState) {
    const parameters = {
      client_id: state.clientId,
      redirect_uri: buildURL(window.location.origin.toString(), process.env.BASE_URL, constants.OAUTH_REDIRECT_PATH),
      response_type: "token",
      state: "state"
    };
    return buildURL(rootState.gitlabInstance, process.env.VUE_APP_OAUTH_AUTHORIZATION_PATH, parameters);
  },
  scopes: () => process.env.VUE_APP_OAUTH_SCOPES.split(","),
  oauthTokenFromLocalStorage: () => () => {
    const oauthToken = localStorage.getItem("oauthToken");
    if (!oauthToken) {
      return undefined;
    }

    const { accessToken, tokenType, expiresIn } = JSON.parse(oauthToken);

    if (!accessToken || !tokenType || !expiresIn) {
      return undefined;
    }

    return { accessToken, tokenType, expiresIn: Date.parse(expiresIn) };
  }
};

const state = {
  clientId: process.env.VUE_APP_OAUTH_CLIENT_ID,
  oauthToken: getters.oauthTokenFromLocalStorage()
};

const mutations = {
  [types.UPDATE_OAUTH_CREDENTIALS](state, payload) {
    state.clientId = payload.clientId || state.clientId;
  },
  [types.UPDATE_OAUTH_TOKEN](state, { accessToken, tokenType, expiresIn }) {
    if (!accessToken || !tokenType || !expiresIn) {
      throw new Error("Token must feature properties `accessToken`, `tokenType` and `expiresIn`");
    }

    expiresIn = expiresIn instanceof Date ? expiresIn : new Date(expiresIn);

    Vue.set(state, "oauthToken", Object.assign({}, { accessToken, tokenType, expiresIn }));
    localStorage.setItem("oauthToken", JSON.stringify({ accessToken, tokenType, expiresIn: expiresIn.toISOString() }));
  }
};

const actions = {
  [types.UPDATE_OAUTH_CREDENTIALS]({ commit }, payload) {
    commit(types.UPDATE_OAUTH_CREDENTIALS, payload);
  },
  [types.UPDATE_OAUTH_TOKEN]({ commit }, token) {
    commit(types.UPDATE_OAUTH_TOKEN, token);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export { types };

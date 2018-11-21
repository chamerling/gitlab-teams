import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import gitlab from './gitlab';
import createLogger from 'vuex/dist/logger';

const plugins = process.env.NODE_ENV !== 'production' ? [createLogger()] : [];

Vue.use(Vuex);

export default new Vuex.Store({
  plugins,
  state: {
    apiEndpoint: process.env.VUE_APP_GITLAB || localStorage.getItem('apiEndpoint') || 'https://gitlab.com',
    apiToken: process.env.VUE_APP_API_TOKEN || localStorage.getItem('apiToken'),
    mergeRequests: [],
    teams: [
      { name: 'Jackass' }
    ],
    team: {
      name: 'Jackass',
      usernames: ['laublet', 'chamerling', 'chenry'],
      users: []
    }
  },
  getters: {
    getTeams(state) {
      return state.teams;
    },
    getMergeRequest(state, iid) {
      return _.find(state.mergeRequests, { iid });
    },
    isConfigured(state) {
      return !!state.apiToken;
    }
  },
  mutations: {
    addMergeRequest(state, mergeRequest) {
      state.mergeRequests.push(mergeRequest)
    },

    removeMergeRequest(state, mergeRequest) {
      state.mergeRequests.splice(_.findIndex(state.mergeRequests, mr => mr.iid === mergeRequest.iid), 1);
    },

    cleanMergeRequests(state) {
      state.mergeRequests = [];
    },

    updateMergeRequest(state, mergeRequest) {
      const mr = _.find(state.mergeRequests, { iid: mergeRequest.iid });
      if (mr) {
        mr.user_notes_count = mergeRequest.user_notes_count;
        mr.upvotes = mergeRequest.upvotes;
        mr.title = mergeRequest.title;
      }
    },

    updatePipeline(state, {mergeRequest, pipeline}) {
      const mr = _.find(state.mergeRequests, { iid: mergeRequest.iid });

      if (mr) {
        Vue.set(mr, 'pipeline', pipeline);
      }
    },

    updateSettings(state, settings) {
      state.apiEndpoint = settings.apiEndpoint;
      state.apiToken = settings.apiToken;
      localStorage.setItem('apiEndpoint', state.apiEndpoint);
      localStorage.setItem('apiToken', state.apiToken);
      gitlab.get().unwatchMergeRequests();
      gitlab.init(this);
    },

    setUsers(state, users) {
      state.team.users = users;
    }
  },
  actions: {
    fetchUsers({ state, commit }) {
      return gitlab.get().client.fetchUsers(state.team.usernames).then(users => {
        commit('setUsers', users);
      });
    },

    addMergeRequest({ commit }, mr) {
      commit('addMergeRequest', mr);
    },

    removeMergeRequest({ commit }, mr) {
      commit('removeMergeRequest', mr)
    },

    updateMergeRequest({ commit }, mr) {
      commit('updateMergeRequest', mr);
    },

    updatePipeline({ commit }, mr, pipeline) {
      commit('updatePipeline', mr, pipeline);
    },

    updateSettings({ commit, dispatch }, settings) {
      commit('updateSettings', settings);
      dispatch('launchWatchers');
    },

    launchWatchers({ dispatch, state, commit }) {
      gitlab.get().unwatchMergeRequests();
      commit('cleanMergeRequests');

      dispatch('fetchUsers').then(() => {
        gitlab.get().watchMergeRequestsForUsers({ userIds: state.team.users.map(user => user.id) });
      });
    }
  }
});

import { SET_SCALE } from '../mutation-types';

// init state
const state = {
  scale: 1, // 比例
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  [SET_SCALE](state, val) {
    state.scale = val;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

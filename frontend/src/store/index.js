import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    error: null, 
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    username: (state) => state.user?.username || "",
    roles: (state) => state.user?.roles || [],
    isAdmin: (state) => state.user?.roles.includes("Admin"),
    isEditor: (state) => state.user?.roles.includes("Editor"),
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },
  actions: {
    async login({ commit }, username) {
      commit("CLEAR_ERROR");
      try {
        const response = await axios.post(
          `/api/users/login/${username}`,
          {},
          {
            headers: { token: username },
          }
        );
        commit("SET_USER", response.data);
        return true;
      } catch (err) {
        commit(
          "SET_ERROR",
          err.response?.data?.message || "Login failed. Please try again."
        );
        return false;
      }
    },
    logout({ commit }) {
      commit("CLEAR_USER");
      commit("CLEAR_ERROR");
    },
  },
  modules: {},
});

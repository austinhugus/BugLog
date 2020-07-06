import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: [],
    activeNotes: {},

  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    activeBug(state, bug) {
      state.activeBug = bug
    },
    setNotes(state, notes) {
      state.notes = notes
    },
    addToBugs(state, bug) {
      state.bugs.push(bug);
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#region Bugs

    async getBugs({ commit, dispatch }) {
      try {
        let res = await api.get('bugs')
        commit('setBugs', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async activeBug({ commit, dispatch }, id) {
      try {
        let res = await api.get('bugs/' + id)
        commit('activeBug', res.data);
        dispatch("getNotes", res.data.id)
      } catch (error) {
        console.error(error)
      }
    },

    async createBug({ commit, dispatch }, bugData) {
      try {
        let res = await api.post("bugs", bugData)
        commit("addToBugs", res.data)
        router.push({ name: "Bugs", params: { id: res.data._id } })
      } catch (error) {
        console.error(error)
      }
    },

    async closeBug({ commit, dispatch }, id) {
      try {
        let res = await api.delete("bugs/" + id);
        dispatch('getActiveBug', id);
      } catch (error) {
        console.error(error)
      }
    },

    //Notes

    async getNotes({ commit, dispatch }, id) {
      try {
        let res = await api.get("bugs/" + id + "/notes");
        commit("setNotes", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createNote({ commit, dispatch }, noteData) {
      try {
        let res = await api.post("notes", noteData)
        commit("setNotes", res.data)
        dispatch("getNotes", noteData.bug)
      } catch (error) {
        console.error(error)
      }
    },
    async editNote({ commit, dispatch }, note) {
      try {
        let res = await api.put("notes/" + note.id, note)
        dispatch("getNotes", note.bug.id)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteNote({ commit, dispatch }, note) {
      try {
        let res = await api.delete("notes/" + note.id)
        dispatch("getNotes", note.bug.id)
      } catch (error) {
        console.error(error)
      }
    }
  }
});

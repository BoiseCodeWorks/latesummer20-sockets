import Vue from 'vue'
import Vuex from 'vuex'
import { carStore } from "./carStore";
import { socketStore } from "./socketStore";
import { api } from "../services/AxiosService";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: {},
    cars: [],
    searchTerm: ""
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setCars(state, cars) {
      state.cars = cars
    },
    addCar(state, car) {
      state.cars.push(car)
    },
    deleteCar(state, car) {
      let index = state.cars.findIndex(c => c.id == car.id)
      if (index > -1) {
        state.cars.splice(index, 1)
      }
    },
    updateCar(state, car) {
      let index = state.cars.findIndex(c => c.id == car.id)
      if (index > -1) {
        state.cars.splice(index, 1, car)
      }
    },
    searchCars(state, searchTerm) {
      state.searchTerm = searchTerm
    }

  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },

    //#endregion

  },
  modules: {
    carStore,
    socketStore
  }
})

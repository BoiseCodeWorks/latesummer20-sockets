import { api } from "../services/AxiosService";

export const carStore = {
  actions: {
    async createCar({ commit, dispatch, rootState }, carData) {
      let res = await api.post("/cars", carData)
      // commit("setCars", [...rootState.cars, res.data])
    },
    async getCars({ commit, dispatch }) {
      let res = await api.get("/cars")
      commit("setCars", res.data)
    },
    async bid({ commit, dispatch }, car) {
      await api.put("cars/" + car.id + "/bid", { bid: car.price });
      dispatch("getCars")
    },
    async deleteCar({ commit, dispatch }, carId) {
      try {
        await api.delete('cars/' + carId)
        dispatch("getCars")
      } catch (error) {
        console.error(error)
      }
    }
  }
};

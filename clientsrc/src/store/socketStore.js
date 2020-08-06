import io from "socket.io-client"

let socket = {};

export const socketStore = {
  actions: {
    initializeSocket({ commit, dispatch }) {
      socket = io("//localhost:3000");

      socket.on("CONNECTED", data => {
        console.log(data.message + " Let the villany commence")
      })

      //registers event listeners for emits from socketservice
      socket.on("newCar", car => {
        commit("addCar", car)
      })

      socket.on("deleteCar", car => {
        commit("deleteCar", car)
      })

      socket.on("newBid", car => {
        commit("updateCar", car)
      })
    },
    joinRoom({ commit, dispatch }, roomName) {
      socket.emit("dispatch", { action: "joinRoom", data: roomName })
    },
    leaveRoom({ commit, dispatch }, roomName) {
      socket.emit("disconnect", { action: "leaveRoom", data: roomName })

    }
  }
}
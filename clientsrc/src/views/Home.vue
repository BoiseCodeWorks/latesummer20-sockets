<template>
  <div class="home">
    <h2>Carbay</h2>
    <form @submit.prevent="createCar()">
      <div class="form-group">
        <input
          type="number"
          name
          id
          v-model="carData.price"
          class="form-control"
          aria-describedby="helpId"
        />
        <small id="helpId" class="text-muted">Price</small>
        <input
          type="text"
          name
          id
          v-model="carData.make"
          class="form-control"
          aria-describedby="helpId"
        />
        <small id="helpId" class="text-muted">Make</small>
        <input
          type="text"
          name
          id
          v-model="carData.model"
          class="form-control"
          aria-describedby="helpId"
        />
        <small id="helpId" class="text-muted">Model</small>
        <input
          type="text"
          name
          id
          v-model="carData.imgUrl"
          class="form-control"
          aria-describedby="helpId"
        />
        <small id="helpId" class="text-muted">Image</small>
      </div>
      <button class="btn btn-danger" type="submit">Create</button>
    </form>
    <div class="row">
      <carComp v-for="car in cars" :key="car.id" :carProp="car"></carComp>
    </div>
  </div>
</template>


<script>
import carComp from "../components/CarComp";
export default {
  name: "home",
  data() {
    return {
      carData: {},
    };
  },
  computed: {
    cars() {
      return this.$store.state.cars.filter(
        (c) =>
          c.make.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          c.model.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    searchTerm() {
      return this.$store.state.searchTerm;
    },
  },
  methods: {
    createCar() {
      this.$store.dispatch("createCar", this.carData);
    },
  },
  mounted() {
    this.$store.dispatch("getCars");
    this.$store.dispatch("joinRoom", "cars");
  },
  beforeDestroy() {
    this.$store.dispatch("leaveRoom", "cars");
  },
  components: { carComp },
};
</script>


<style scoped>
</style>
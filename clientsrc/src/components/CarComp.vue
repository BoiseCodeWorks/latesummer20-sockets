<template>
  <div class="carComp">
    <div class="card">
      <img class="card-img-top" :src="carProp.imgUrl" alt />
      <div class="card-body">
        <h4 class="card-title">{{carProp.make}}</h4>
        <p class="card-text">{{carProp.model}}</p>
        <p class="card-text">{{carProp.price}}</p>
      </div>
      <button class="btn btn-danger" @click="deleteCar">Delete</button>
      <button class="btn btn-success" @click="bid">Bid</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "carComp",
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteCar() {
      this.$store.dispatch("deleteCar", this.carProp.id);
    },
    bid() {
      this.carProp.price++;
      this.$store.dispatch("bid", this.carProp);
    },
  },
  components: {},
  props: ["carProp"],
};
</script>


<style scoped>
</style>
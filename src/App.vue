<template>
  <div>
    <car-form />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CarForm from './components/forms/carForm.vue';

@Options({
  components: {
    CarForm,
  },
})
export default class App extends Vue {}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
* {
  font-family: 'Open Sans', sans-serif;
}
</style>

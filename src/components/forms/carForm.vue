<template>
  <simple-card class="vd-form">
    <template #title>Autoverzekering vergelijken</template>

    <template #content>
        <p>
            Replace me for input fields
        </p>

        <!-- LicensePlate -->

        <!-- Zipcode -->

        <!-- Housenumber -->

        <!-- Housenumber addition -->

        <!-- birthdate -->

        <!-- ClaimFree years -->

        <!-- Kilometrage -->

        <div class="btn" @click="onSubmit">
            Vergelijken
        </div>
    </template>
  </simple-card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SimpleCard from './simpleCard.vue';

@Options({
  components: {
    SimpleCard,
  },
})
export default class CarForm extends Vue {
  onSubmit(): void {
    console.log('Button is clicked');
  }
}
</script>

<style scoped>
    .vd-form {
        width: 330px;
    }

    @media only screen and (max-width: 768px) {
        .vd-form {
            width: 100%;
        }
    }

    .btn {
        background: #0cbe3b;
        text-align: center;
        padding: 10px 10px;
        font-weight: 600;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        transition: .1s ease;
    }

    .btn:hover {
        background: #0ed642;
    }
</style>

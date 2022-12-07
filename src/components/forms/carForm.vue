<template>
  <simple-card class="vd-form">
    <template #title>Autoverzekering vergelijken</template>

    <template #content>
      <!-- LicensePlate -->
      <Form @submit.prevent="onSubmit">
        <span>LicensePlate</span><br>
        <input v-model="kenteken" @input="licenseplate" @keyup="licenseplate" type="text" placeholder="LicensePlate" />
        <div class="error">{{ kentekenErrorMessage }}</div>
        <div v-if="(cars.length > 0)" class="plate">
          <p>Car Brand: {{ cars[0].merk }}</p>
          <p>Manufacturing Year: {{ cars[0].datum_eerste_toelating.slice(0, 4) }}</p>
        </div>
        <div v-if="wrongPlate" class="error">
          <p>There is no such licence plate number in the base</p>
        </div>
        <!-- Zipcode -->
        <span>Zipcode</span><br>
        <input v-model.trim="zipcode" @keyup="upperZipcode" type="text" placeholder="Zipcode" />
        <div class="error">{{ zipcodeErrorMessage }}</div>
        <!-- Housenumber -->
        <span>Housenumber</span><br>
        <input v-model="houseNumber" type="text" placeholder="Housenumber">
        <div class="error">{{ houseNumberErrorMessage }}</div>
        <!-- Housenumber addition -->
        <span>Housenumber addition</span><br>
        <input v-model="houseNumberAddition" type="text" placeholder="Housenumber addition">
        <div class="error">{{ houseNumberAdditionErrorMessage }}</div>
        <!-- birthdate -->
        <span>Birthdate</span><br>
        <input type="date" format="DD.MM.YYYY" @input="maxFreeYears" v-model="birthDate" />
        <div class="error">{{ birthDateErrorMessage }}</div>
        <!-- ClaimFree years -->
        <span>Claim Free years</span><br>
        <select v-model="claimFreeYears" name="claimFreeYears">
          <option value="-5">-5</option>
          <option value="-4">-4</option>
          <option value="-3">-3</option>
          <option value="-2">-2</option>
          <option value="-1">-1</option>
          <option value="0" selected>0</option>
          <option :value="numPlus" v-for="numPlus in maxYears" :key="numPlus">{{ numPlus }}</option>
        </select>
        <!-- Kilometrage -->
        <span>Kilometrage</span><br>
        <select v-model="kilometrage" name="kilometrage">
          <option>0 t/m 7500 KM</option>
          <option selected>7501 t/m 10000 KM</option>
          <option>10001 t/m 12000 KM</option>
          <option>12001 t/m 15000 KM</option>
          <option>15001 t/m 20000 KM</option>
          <option>20001 t/m 25000 KM</option>
          <option>25001 t/m 30000 KM</option>
          <option>30001 t/m 90000 KM</option>
        </select>

        <div class="btn" @click="onSubmit">
          Vergelijken
        </div>
      </Form>
    </template>
  </simple-card>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
// import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useCarFormService } from '@/components/services/useCarFormService';
import { CarFormModel } from '../models/CarFormModel';
import SimpleCard from './simpleCard.vue';

// const router = useRouter();
const zipcodeRegex = /^[A-Z0-9]{4}(?:99)?$/;
const houseNumberRegex = /^([0-9]+)$/;
const houseNumberAdditionRegex = /^[a-zA-Z0-9]+$/;
const hundreedYearsMS = new Date().valueOf() - 3155695200000;

const schema = yup.object({
  kenteken: yup
    .string()
    .required('Please enter the licenseplate')
    .trim()
    .min(6, 'Licenseplate consists of 6 characters')
    .max(6, 'Licenseplate consists of 6 characters'),
  birthDate: yup
    .date()
    .required('Please enter the Date of Birth')
    .typeError('please enter a valid date')
    .min(new Date(hundreedYearsMS), 'You need to be younger then 100 years')
    .max(new Date(), 'You can not be born in the future!'),
  zipcode: yup
    .string()
    .matches(zipcodeRegex, 'Zipcode has the format XXXX99')
    .required('Please enter the zipcode')
    .trim()
    .min(6, 'Zipcode consists of 6 characters')
    .max(6, 'Zipcode consists of 6 characters'),
  houseNumber: yup
    .string()
    .required('Please enter the housenNumber')
    .matches(houseNumberRegex, 'House number consists of digits'),
  houseNumberAddition: yup
    .string()
    .required('Please enter the housenNumber')
    .matches(houseNumberAdditionRegex, 'House number consists of digits and/or letters'),
});
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: kenteken, errorMessage: kentekenErrorMessage } = useField<string>('kenteken');
const { value: zipcode, errorMessage: zipcodeErrorMessage } = useField<string>('zipcode');
const { value: houseNumber, errorMessage: houseNumberErrorMessage } = useField<string>('houseNumber');
const { value: houseNumberAddition, errorMessage: houseNumberAdditionErrorMessage } = useField<string>('houseNumberAddition');
const { value: birthDate, errorMessage: birthDateErrorMessage } = useField<string>('birthDate');
const { value: claimFreeYears } = useField<string>('claimFreeYears');
const { value: kilometrage } = useField<string>('kilometrage');

claimFreeYears.value = '0';
kilometrage.value = '7501 t/m 10000 KM';

function upperZipcode() { zipcode.value = zipcode.value.toUpperCase().replace(/\s/g, ''); }

const maxYears = ref<number>();
function maxFreeYears() {
  const currentYear = new Date().getFullYear();
  const bthDate = new Date(birthDate.value).getFullYear();
  const age = currentYear - bthDate;
  maxYears.value = age - 18;
}

const cars = ref<CarFormModel[]>([]);
const wrongPlate = ref(false);
async function licenseplate() {
  kenteken.value = kenteken.value.toUpperCase().replace(/-/g, '');
  if (kenteken.value.length === 6) {
    cars.value = await useCarFormService().getCar(kenteken.value);
    if (cars.value.length < 1) { wrongPlate.value = true; } else { wrongPlate.value = false; }
  } else { cars.value = []; }
}

const onSubmit = handleSubmit(async () => {
  const params = new URLSearchParams({
    kenteken: kenteken.value,
    zipcode: zipcode.value,
    houseNumber: houseNumber.value,
    houseNumberAddition: houseNumberAddition.value,
    birthDate: birthDate.value,
    claimFreeYears: claimFreeYears.value,
    kilometrage: kilometrage.value,
  });
  console.log(params.toString());
});
</script>

<style scoped>
.vd-form {
  width: 330px;
}

form {
  padding: 10px;
  border: 2px solid black;
  border-radius: 5px;
}

input {
  display: block;
  box-sizing: border-box;
}

span {
  font-size: 20px;
  display: inline-block;
  margin: 15px 0 15px;
  font-weight: bold;
}

select {
  display: block;
  width: 164px;
  box-sizing: border-box;
  margin-bottom: 25px;
}

.error {
  font-size: 12px;
  color: rgb(255, 0, 0);
}

.plate {
  font-size: 12px;
}

input[type="date"]::-webkit-datetime-edit,
input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-clear-button {
  color: #fff;
  position: relative;
}

input[type="date"]::-webkit-datetime-edit-year-field {
  position: absolute !important;
  border-left: 1px solid #8c8c8c;
  padding: 2px;
  color: #000;
  left: 56px;
}

input[type="date"]::-webkit-datetime-edit-month-field {
  position: absolute !important;
  border-left: 1px solid #8c8c8c;
  padding: 2px;
  color: #000;
  left: 26px;
}

input[type="date"]::-webkit-datetime-edit-day-field {
  position: absolute !important;
  color: #000;
  padding: 2px;
  left: 4px;

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

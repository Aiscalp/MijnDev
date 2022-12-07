# MijnDev.com Vue.js code challenge


## Before starting the coding

* Make sure you've read all the descriptions
* Ask questions if you have any
* Set yourself a deadline for delivery of the challange and let us know this deadline. We will be expecting a code by that time.

## Requirements
Build a car comparison input form (See src\components\forms\carForm.vue). 

The customer needs to fill the following information into the form:

#### License plate
  - Make sure that the input follows the next format XXXXXX (Remove dashes and always use capital)
  - Retrieve information about vehicle from license plate (https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=05GFD9) and present brand (merk) and manufacturing year (datum_eerste_toelating) to the form UI. Please note: RDW webservice only accept capital letters 05GFD9 instead of 05gfd9)
  - Show an error message for the format if it is not correct. Or if the license is not a valid license plate.
#### Zipcode
  - Make sure that the input follows the next format XXXX99(Always use capital and remove spaces)
  - Make sure that the input, if filled in, else trigger an error message.
#### House number
  - Make sure that the input only allows numbers
  - Make sure that the input, if filled in, else trigger an error message.
#### House number addition
  - Make sure that the input only allows numbers and/or letters
#### Birthdate
  - Make sure that the input follows the next format DD-MM-YYYY
  - Make sure that the date is valid, libraries that can be used for this are https://www.npmjs.com/package/moment
  - Make sure that the user cannot be more than 100 years old.
  - Show an error message for these above cases if triggered.
  - Make sure that the input, if filled in, else trigger an error message.
#### Claim Free years
  - Options should be between -5 and (current year - birthdate year - 18(Legal age)). For Example, (2022 - 1980) - 18 = 24 (maximum allowed years). Default selected value should be 0.
#### Kilometrage
  - Options for Kilometrage are:
    - 0 t/m 7500 KM
    - 7501 t/m 10000 KM
    - 10001 t/m 12000 KM
    - 12001 t/m 15000 KM
    - 15000 t/m 20000 KM
    - 20001 t/m 25000 KM
    - 25001 t/m 30000 KM
    - 30001 t/m 90000 KM
  - Default selected value should be 7501 t/m 10000 KM

#### Send button
- A button that sends all values selected into queryparams url https://en.wikipedia.org/wiki/Query_string

## Technical challenges
- Split HTML into multiple components https://vuejs.org/api/sfc-spec.html
- Add field validation https://vee-validate.logaretm.com/v4/
- Build unit tests for the components

## UI
For this section, you can choose your own implementation. This can be bootstrap, Tailwind or any other libraries you want or standard CSS.

## Technical details
This project was generated with https://cli.vuejs.org/ with an addition for typescript and vue-class-component

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

## Project delivery

* The delivery of the project will be accepted only in github or bitbucket.
* Add this folder untouched as a `master` branch
* Deliver your code in `feature` branch
* Make a pull request from `feature` -> `master`
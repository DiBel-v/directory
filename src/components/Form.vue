<template>
  <form id="form">
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="40"
      label="ФИО"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="Email"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="phone"
      :error-messages="phoneErrors"
      label="Телефон"
      required
      @input="$v.phone.$touch()"
      @blur="$v.phone.$touch()"
    ></v-text-field>

    <v-btn class="mr-4" @click="submit">Добавить</v-btn>
    <v-btn @click="clear">Очистить</v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
//   const mobile = /(\d?)(\d{3})(\d{3})(\d{2})(\d{2})/g;
//   const substPhone = "+$1 ($2) $3-$4-$5";
const checkPhone = value => {
  const mobile = /\+7\(\d{3}\)\d{7}$/;
  return mobile.test(value);
};

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(40) },
    email: { required, email },
    phone: { required, checkPhone }
  },

  data: () => ({
    name: "",
    email: "",
    phone: ""
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("ФИО должно быть не больше 40 символов");
      !this.$v.name.required && errors.push("Нужно ввести ФИО");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Неправильный формат email");
      !this.$v.email.required && errors.push("Нужно ввести email");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.required && errors.push("Нужно ввести номер телефона");
      !this.$v.phone.checkPhone &&
        errors.push("Формат номера должен быть: +7(999)9999999");
      return errors;
    }
  },

  methods: {
    
    submit() {
      this.$v.$touch();
      if( this.name && this.email && this.phone){
      this.$store.commit("addContact", {
        id: this.$store.state.contactsList[
            this.$store.state.contactsList.length - 1
          ].id + 1,
        FIO: this.name,
        email: this.email,
        phone: this.phone
      });
    }},
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.phone = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#form {
  margin: 0 auto;
  width: 40%;
}
</style>

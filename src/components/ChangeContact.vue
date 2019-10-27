<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">Редактирование информации</slot>
          </div>
          <div class="modal-body">
            <slot name="body">
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
                <v-btn class="mr-4" @click="submit" >Обновить</v-btn>
                <v-btn @click="deleteContact">Удалить</v-btn>
              </form>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">OK</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
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
    //Описание ошибок при некорректном вводе данных
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
    },
    currentContact() {
      let currentId = this.$route.params.id;
      return this.$store.getters.getCurrentContact(currentId);
    }
  },
  created() {
    this.name = this.currentContact.FIO;
    this.email = this.currentContact.email;
    this.phone = this.currentContact.phone;
  },
  methods: {
    submit() {
      //Обновить существующий контакт в сторе
      this.$store.commit(
        "updateContact",
        {
          id: this.currentContact.id,
          FIO: this.name,
          email: this.email,
          phone: this.phone
        },
      );
      this.$v.$touch();
      this.$emit('close');
    },
    //Удалить контакт из стора
    deleteContact() {
      this.$store.commit(
        "removeFromContactsList",
        this.currentContact
      );
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
}
.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

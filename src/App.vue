<template>
<v-content>
  <v-app>
    <Form />
    <ContactsList @open="showModal=true"/>
    <ChangeContact v-if="showModal" @close="closeModal()" />
  </v-app>
</v-content>
</template>

<script>
import ContactsList from './components/ContactsList.vue'
import Form from './components/Form.vue'
import ChangeContact from './components/ChangeContact.vue'

export default {
  name: 'app',
  components: {
    ContactsList,
    Form,
    ChangeContact
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal(){
      this.showModal = false;
      this.$router.push({ path: '/contact-list' })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

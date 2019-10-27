<template>
  <div id="contactsList">
    <table class="table">
      <thead class="table-thead">
        <th class="table-cell">№</th>
        <th class="table-cell">ФИО</th>
        <th class="table-cell">Email</th>
        <th class="table-cell">Телефон</th>
        <th class="table-cell"></th>
      </thead>
      <tbody>
        <tr class="table-row" v-for="item in contactsList" :key="item.id">
          <td class="table-cell">{{item.id}}</td>
          <td class="table-cell">{{item.FIO}}</td>
          <td class="table-cell">{{item.email}}</td>
          <td class="table-cell">{{item.phone}}</td>
          <td class="table-cell"><span @click="$emit('open')"><router-link class="table-cell__link" :to="{ name: 'ChangeContact', params: { id: item.id }}">изменить</router-link></span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "ContactsList",
  data: () => {
    return {
    }
  },
  //Получаем список всех контактов в сторе
  computed: {
  ...mapGetters({
    contactsList: 'getContactsList'
  })
  },
};
</script>

<style scoped>
#contactsList{
  margin: 50px auto;
}
.table-thead{
  color: white;
  background-color: rgb(61, 60, 60);
}
.table{
  border-collapse: collapse;
}
.table-cell{
  border:1px solid rgba(113, 110, 133, 0.815);
  padding: 5px 10px;
}
.table-cell__link{
  text-decoration: none;
}
.table-row:nth-child(odd){
  background-color: rgb(236, 233, 233);
}
</style>

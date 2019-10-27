import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let contactsList = window.localStorage.getItem('contactsList');
export default new Vuex.Store({
    state: {
        contactsList: contactsList ? JSON.parse(contactsList) : [
            {
                id: 1,
                FIO: 'Иванов Иван Иванович',
                email: 'test@email.com',
                phone: '+7(123)1231212'
            },
            {
                id: 2,
                FIO: 'Петров Иван Иванович',
                email: 'test2@email.com',
                phone: '+7(123)1231212'
            },
            {
                id: 3,
                FIO: 'Сидоров Иван Иванович',
                email: 'test3@email.com',
                phone: '+7(123)1231212'
            }
        ]
    },
    getters:{
        getContactsList: state => state.contactsList,
        getCurrentContact: (state) => (id) => {
            return state.contactsList.find(contact => contact.id === +id)
          }
    },
    mutations:{
        addContact(state, item){
            state.contactsList.push(item);
            this.commit('saveData');
        },
        saveData(state){
            window.localStorage.setItem('contactsList', JSON.stringify(state.contactsList));
        },
        removeFromContactsList(state, item,){
            let index = state.contactsList.indexOf(item);
            state.contactsList.splice(index,1);
            this.commit('saveData');
        },
        updateContact(state, newItem){
            let index = state.contactsList.indexOf(state.contactsList.find(element => element.id===newItem.id));
            state.contactsList.splice(index,1,newItem);
            this.commit('saveData');
        }
    }
})
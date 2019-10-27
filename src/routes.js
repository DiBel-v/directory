import App from "./App";
import ChangeContact from './components/ChangeContact'


export const routes = [
    {
        path: '',
        redirect: { name: 'app' }
    },
    {
        path: '/contact-list',
        component: App,
        name: 'app'
    },
    {
        path: '/contact-list/:id',
        component: ChangeContact,
        name: 'ChangeContact'
    },

]
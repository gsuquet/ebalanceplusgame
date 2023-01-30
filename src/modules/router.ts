import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    { path: '/', name:'Home', component: () => import('../views/Home.vue') },
    {path:'/list', name:"List", component: () => import('../views/List.vue')},
    {path:'/temp', name:'Temp', component:() => import('../components/AddConsumptionWindow.vue')},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;

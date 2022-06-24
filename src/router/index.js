import Vue from "vue";
import VueRouter from "vue-router";
import ShowData from '../components/ShowData.vue';
import LogIn from '../components/LogIn.vue';
Vue.use(VueRouter);

const routes = [
  {path: '/' , component: LogIn , name: 'LogIn'}
  ,{path: '/showdata' , component: ShowData , name: 'ShowData'}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

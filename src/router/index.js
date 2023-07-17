import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import KotaView from '../views/KotaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: '/cuaca/:negara/:kota',
      name: 'kotaView',
      component: KotaView,
      meta: {
        title: "Cuaca",
      },
    }
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.params.negara ? `${ to.params.kota}, ${to.params.negara }` : to.meta.title} | Cuaca Lokal`;
  next();
})

export default router

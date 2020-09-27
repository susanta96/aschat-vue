import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../components/Welcome.vue';
import Chat from '../components/Chat.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: (to, from, next) => {
      const name = localStorage.getItem('name');
      const userImg = localStorage.getItem('userImg');
      const token = localStorage.getItem('token');
      if (name && userImg && token) {
        next(
          {
            name: 'Chat',
            params: {
              name,
              userImg,
              token,
            },
          },
        );
      } else next();
    },
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    props: true,
    beforeEnter: (to, from, next) => {
      if (to.params.name && to.params.userImg && to.params.token) next();
      else {
        const name = localStorage.getItem('name');
        const userImg = localStorage.getItem('userImg');
        const token = localStorage.getItem('token');
        if (name && userImg && token) {
          next(
            {
              name: 'Chat',
              params: {
                name,
                userImg,
                token,
              },
            },
          );
        } else next({ name: 'Welcome' });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

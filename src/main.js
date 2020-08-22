import { createApp } from 'vue';
import VueChatScroll from 'vue-chat-scroll';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router).use(VueChatScroll).mount('#app');

<template>
  <div class="home">
    <Welcome v-if="!user"/>
  </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue';
import { auth } from '@/firebase/init';

export default {
  name: 'Home',
  components: {
    Welcome,
  },
  data() {
    return {
      user: null,
    };
  },
  watch() {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

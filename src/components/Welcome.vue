<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome</h2>
        <form @submit.prevent="enterChat">
          <label for="name">Enter Your Name</label>
          <input
            type="text"
            name="name"
            autocomplete="off"
            id="name"
            v-model="name"
          />
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn teal">Enter Chat</button>
        </form>
        <br class="my-5" />
        <button class="btn-floating pulse btn-google"
        @click="googleSingIn">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase, auth } from '@/firebase/init';

export default {
  name: 'Welcome',
  data() {
    return {
      name: null,
      feedback: null,
    };
  },
  methods: {
    enterChat() {
      if (this.name) {
        // localStorage.setItem('name', this.name);
        // this.$router.push({ name: 'Chat', params: { name: this.name } });
      } else {
        this.feedback = 'You must enter a name to join';
      }
    },
    googleSingIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      auth.useDeviceLanguage();
      auth.signInWithPopup(provider).then((res) => {
        const { user, credential } = res;
        const { accessToken: token } = credential;
        const { photoURL: userImg, email, displayName: name } = user;
        localStorage.setItem('name', name);
        localStorage.setItem('userImg', userImg);
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
        this.$router.push({
          name: 'Chat',
          params: {
            name,
            userImg,
            token,
          },
        });
      }).catch((err) => {
        const { email, credential } = err;
        console.log(email, credential);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.welcome {
  max-width: 400px;
  margin-top: 7rem;
  @media screen and (max-width: 768px) {
    margin-top: 3.5rem;
  }
  h2 {
    font-size: 2.8em;
    line-height: 1;
    margin: 0 0 3rem;
  }
  button {
    margin: 30px auto 1rem;
  }
  .btn-google {
    display: grid;
    place-content: center;
    color: #545454;
    background-color: #ffffff;
  }
}
</style>

<template>
  <div class="welcome container">
   <div class="card">
     <div class="card-content center-align">
       <h2 class="teal-text">Welcome</h2>
       <form @submit.prevent="enterChat">
         <label for="name">Enter Your Name</label>
         <input type="text" name="name" id="name" v-model="name">
         <p v-if="feedback" class="red-text">{{feedback}}</p>
         <button class="btn teal">Enter Chat</button>
       </form>
     </div>
   </div>
  </div>
</template>

<script>
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
        this.$router.push({ name: 'Chat', params: { name: this.name } });
      } else {
        this.feedback = 'You must enter a name to join';
      }
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
}
</style>

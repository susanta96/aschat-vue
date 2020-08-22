<template>
  <div class="new-messages">
    <form @submit.prevent="addMessage">
      <div class="row">
        <div class="col s9 m11">
          <label for="new-message">New Message (enter to submit)</label>
          <input type="text" name="new-message" id="new-message"
            autocomplete="off" v-model="newMessage">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
        </div>
        <div class="col s3 m1">
          <button type="submit" class="btn-floating btn-large teal">
            <i class="material-icons send">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'NewMessage',
  props: {
    name: String,
  },
  data() {
    return {
      newMessage: null,
      feedback: null,
    };
  },
  methods: {
    addMessage() {
      console.log(this.newMessage, Date.now(), this.name);
      if (this.newMessage) {
        db.collection('messages').add({
          content: this.newMessage,
          name: this.name,
          timestamp: Date.now(),
        }).catch((err) => console.log(err));

        this.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a message to send one';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
    margin-bottom: 0;
  }
</style>

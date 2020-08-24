<template>
  <div class="new-messages">
    <form @submit.prevent="addMessage">
      <div class="row">
        <div class="col s9 m11">
          <!-- <label for="new-message">New Message (enter to submit)</label> -->
          <div class="row">
            <div class="input-field col s12">
              <label for="new-message">Type a Message</label>
              <textarea id="new-message" name="new-message" v-model="newMessage"
              @keyup.tab="$event.target.nextElementSibling.focus()"
              class="materialize-textarea"></textarea>
            </div>
          </div>
          <!-- <input type="text" name="new-message" id="new-message"
            autocomplete="off" v-model="newMessage"> -->
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
import M from 'materialize-css/dist/js/materialize';

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
  mounted() {
    M.textareaAutoResize(document.getElementById('new-message'));
  },
  methods: {
    addMessage() {
      if (this.newMessage && this.newMessage.trim()) {
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

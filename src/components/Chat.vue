<template>
  <div class="chat container">
    <h2 class="center teal-text m-0">AS Chat</h2>
    <div class="card">
      <div class="card-content">
        <auto-scroll>
          <ul class="messages">
            <li
              :class="message.name === name ? 'my-message' : 'other'"
              v-for="message in messages"
              :key="message.id"
            >
              <span class="teal-text text-darken-3 name">{{ message.name }}</span>
              <span class="grey-text text-darken-3 content">{{ message.content }}</span>
              <span class="grey-text text-darken-2 time">{{ message.timestamp }}</span>
            </li>
          </ul>
        </auto-scroll>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage.vue';
import db from '@/firebase/init';
import moment from 'moment';
import AutoScroll from './common/AutoScroll.vue';

export default {
  name: 'Chat',
  props: {
    name: String,
  },
  components: {
    NewMessage,
    AutoScroll,
  },
  data() {
    return {
      messages: [],
    };
  },
  created() {
    const ref = db.collection('messages').orderBy('timestamp');
    ref.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const { doc } = change;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('lll'),
          });
        }
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.chat {
  max-width: 850px;
  margin: 0 auto;
  h2 {
    font-size: 2.6rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 450px) {
      margin: 0;
    }
  }
  span {
    font-size: 1.4rem;
  }
  .time {
    display: block;
    font-size: 0.8rem;
  }
  .name {
    font-size: 1rem;
    display: block;
  }
  .content {
    display: block;
    font-size: 1.2rem;
    line-height: 1;
    margin: 0.2rem 0 0.75rem 0;
    white-space: pre-line;
  }
  .card .card-action {
    @media screen and (max-width: 450px) {
      padding: 10px 5px;
    }
  }
  .card-content {
    @media screen and (max-width: 450px) {
      padding: 10px 5px;
    }
    height: 500px;
    overflow: hidden;
  }
  .messages {
    text-align: left;
    overflow-x: hidden;
    li {
      margin-bottom: 1rem;
      width: max-content;
      text-align: left;
      padding: 0.6rem 2rem;
      max-width: 450px;
      border-radius: 6px;
      @media screen and (max-width: 450px) {
        max-width: 90%;
      }
    }
    .my-message {
      background: lightblue;
      margin-left: auto;
      margin-right: 0.3rem;
    }
    .other {
      background: lighten(teal, 10);
      margin-left: 0.3rem;
    }
  }
}
</style>

<template>
  <div class="chat container">
    <h2 class="center teal-text">AS Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{message.name}}</span>
            <span class="grey-text text-darken-3">{{message.content}}</span>
            <span class="grey-text time">{{message.timestamp}}</span>
          </li>
        </ul>
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

export default {
  name: 'Chat',
  props: {
    name: String,
  },
  components: {
    NewMessage,
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
  h2 {
    font-size: 2.6rem;
    margin-bottom: 40px;
  }
  span {
    font-size: 1.4rem;
  }
  .time {
    display: block;
     font-size: .8rem;
  }
  .messages {
    text-align: left;
    max-height: 400px;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: #aaa;
    }
    &::-webkit-scrollbar-track {
      background: #ddd;
    }
  }

}
</style>

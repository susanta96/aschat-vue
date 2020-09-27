<template>
  <div class="chat container">
    <h2 class="center teal-text m-0">AS Chat</h2>
    <div class="card">
      <div class="card-content">
      <div class='row'>
        <div class="col s4 m4 push-s8 push-m9">
          <button class="waves-effect waves-light btn" @click="logout">
            <i class="material-icons right">login</i>Logout
          </button>
        </div>
      </div>
        <auto-scroll>
          <ul class="messages">
            <li
              :class="message.name === name ? 'sent' : 'receive'"
              v-for="message in messages"
              :key="message.id"
            >
              <div class="img-name-wrapper">
                <img :src="message.userImg || 'https://api.adorable.io/avatars/23/abott@adorable.png'" alt='user' class="userImg">
                <span class="teal-text text-darken-3 name">{{ message.name }}</span>
              </div>
              <div class='content-wrapper'>
                <span class="grey-text text-darken-3 content">{{ message.content }}</span>
                <span class="grey-text text-darken-2 time">{{ message.timestamp }}</span>
              </div>
            </li>
          </ul>
        </auto-scroll>
      </div>
      <div class="card-action">
        <NewMessage :name="name" :userImg="userImg"  />
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage.vue';
import { db, auth } from '@/firebase/init';
import moment from 'moment';
import AutoScroll from './common/AutoScroll.vue';

export default {
  name: 'Chat',
  props: {
    name: String,
    userImg: String,
    token: String,
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
  methods: {
    logout() {
      auth.signOut().then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('userImg');
        this.$router.push({ name: 'Welcome' });
      }).catch((err) => console.log(err.message));
    },
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
            userImg: doc.data().userImg,
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
  .btn {
    position: relative;
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
      padding: 10px;
      max-width: 450px;
      border-radius: 6px;
      @media screen and (max-width: 450px) {
        max-width: 90%;
      }
    }
    .content-wrapper {
      padding: 0 1rem;
    }
    .img-name-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 1rem;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .sent {
      background: lightblue;
      margin-left: auto;
      margin-right: 0.3rem;
    }
    .receive {
      background: lighten(teal, 10);
      margin-left: 0.3rem;
    }
  }
}
</style>

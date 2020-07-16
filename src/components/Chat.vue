<template>
  <div class="chat container">
    <h2 class="center-align teal-text">Ninja Chat</h2>
    <div class="center teal-text">
      <div class="card">
        <div class="card-content">
          <ul class="messages" v-chat-scroll>
            <li v-for="msg in messages" :key="msg.id">
              <span class="teal-text">{{ msg.name }}: </span>
              <span class="grey-text text-darken-3">{{ msg.content }}</span>
              <span class="grey-text time">{{ msg.timestamp }}</span>
            </li>
          </ul>
        </div>
        <div class="card-action">
          <NewMessage :name="name" />
        </div>
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
    name: {
      type: String,
      required: true,
    },
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
    const ref = db.collection('messages').orderBy('time');
    ref.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const { doc } = change;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().time).format('lll'),
          });
          console.log(this.messages);
        }
      });
    });
  },
};
</script>

<style lang="scss">
.chat {
  h2 {
    font-size: 2em;
    margin-bottom: 40px;
  }
  span {
    font-size: 1.4em;
  }
  ul {
    max-height: 200px;
    overflow: auto;
    background: rgb(243, 243, 243);
    padding: 20px;
    border-radius: 4px;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-track {
      background: #ddd;
    }
    &::-webkit-scrollbar-thumb {
      background: #aaa;
    }
    li {
    text-align: left;
    margin-bottom: 20px;
    span {
      font-size: 1.2em;
    }
  }
  }
  .time {
    display: block;
    font-size: 0.8em;
  }
}
</style>

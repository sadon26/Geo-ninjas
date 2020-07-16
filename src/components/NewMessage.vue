<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New message (press enter to add):</label>
      <input type="text" name="new-message" v-model="newMessage">
      <p class="red-text" v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'NewMessage',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newMessage: null,
      feedback: null,
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage) {
        db.collection('messages').add({
          content: this.newMessage,
          name: this.name,
          time: Date.now(),
        }).catch((err) => console.log(err));
        this.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a message in order to send one';
      }
    },
  },
};
</script>

<style lang="scss">
.new-message {
  label {
    display: flex;
    justify-content: left;
  }
}
</style>

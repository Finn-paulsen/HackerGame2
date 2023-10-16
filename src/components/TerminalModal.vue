<template>
  <div v-if="show" class="terminal-modal">
    <div id="output" class="terminal-output">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="terminal-message"
      >
        {{ message }}
      </div>
    </div>
    <input
      v-model="command"
      @keydown.enter="executeCommand"
      placeholder="Enter command..."
      class="terminal-input"
    />
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

const command = ref("");
const messages = ref([]);
const loading = ref(false);
const show = ref(false);

const open = () => {
  show.value = true;
};


const close = () => {
  show.value = false;
};
const executeCommand = () => {
  // Füge die Logik für die Befehlsausführung hier ein
};
</script>
  
  <style scoped>
.terminal-modal {
  background-color: #000;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.terminal-output {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #333;
  padding: 10px;
  margin-bottom: 10px;
}

.terminal-message {
  margin-bottom: 5px;
}

.terminal-input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
  
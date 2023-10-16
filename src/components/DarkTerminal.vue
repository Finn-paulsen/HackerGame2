<template>
    <div>
        <div class="dark-terminal">
        <div v-for="(message, index) in messages" :key="index" class="terminal-message">{{ message }}</div>
      </div>
      <input v-model="command" @keydown.enter="executeCommand" placeholder="Please enter a command..." />
      <DarkTerminal v-if="showDarkTerminal" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';

  export default {
   
    setup() {
      const command = ref('');
      const messages = ref([]);
      const loading = ref(false);
      const showDarkTerminal = ref(false);
  
      const executeCommand = () => {
        if (!command.value.trim()) return;
  
        loading.value = true;
        messages.value.push("Executing command...");
  
        setTimeout(() => {
          messages.value.pop();
          loading.value = false;
  
          if (command.value.toLowerCase() === "getdata") {
            messages.value.push("Data retrieved successfully!");
          } else {
            messages.value.push(`Error: Command not recognized - ${command.value}`);
          }
  
          command.value = "";
        }, 1500);
      };
  
      return {
        command,
        messages,
        loading,
        showDarkTerminal,
        executeCommand,
      };
    },
    watch: {
      showDarkTerminal(newValue) {
        if (!newValue) {
          this.messages = [];
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .dark-terminal {
    background-color: #000;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  
  #output {
    height: 200px;
    overflow-y: auto;
    border: 1px solid #333;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .terminal-message {
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  </style>
  
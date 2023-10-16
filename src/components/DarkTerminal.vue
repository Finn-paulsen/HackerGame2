<template>
    <div>
        <div class="dark-terminal" id="output">
        <div v-for="(message, index) in messages" :key="index" class="terminal-message">{{ message }}</div>
      </div>
      <form @submit.prevent="executeCommand">
        <input v-model="command" placeholder="Please enter a command..." />
      </form>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { userStore } from "../store/user";

const command = ref('');
const messages = ref([]);
const loading = ref(false);
const showDarkTerminal = ref(false);
const userData = userStore();


const executeCommand = () => {
    console.log("richtig")
      if (!command.value.trim()) return;


  loading.value = true;
  messages.value.push("Executing command...");
  
  

    if (command.value.toLowerCase() === "getdata") {
      messages.value.push("Data retrieved successfully!");
    } else {
      messages.value.push(`Error: Command not recognized - ${command.value}`);
    }
};      

const clearMessages = () => {
  messages.value = [];
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
    color: orange;
  }
  
  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  </style>
  
<template>
  <img
    src="../Bilder/terminal-icon.png"
    class="icon-container"
    @click="() => (isOpened = !isOpened)"
    alt="Terminal Icon"
  />

  <div v-if="isOpened" class="terminal-container">
    <h2>Command Prompt</h2>
    <h3>Welcome to the Hacker Terminal</h3>
    <form @submit.prevent="userData.checkAccess(idText)">
      <label for="username">Username:</label>
      <input type="text" />
      <label for="password">Password:</label>
      <input type="password" />
      <label for="id">ID:</label>
      <input type="text" v-model="idText" />
      <button type="submit">Enter</button>
    </form>
    <div v-if="userData.showErrorMessage">
      Something went wrong. Please check if the writen ID is right!
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { userStore } from "../store/user";

const userData = userStore();
const idText = ref();
const isOpened = ref(false);
</script>
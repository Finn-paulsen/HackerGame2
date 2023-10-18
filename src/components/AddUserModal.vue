<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <h2>Neuen Benutzer hinzufügen</h2>
        <form @submit.prevent="addUser">
        
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
          <hr>
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
          <hr>
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
          <hr>
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
          <hr>
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
          <hr>
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
          <hr>
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
          <hr>
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
          <hr>
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
          <hr>
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
          <hr>
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
          <hr>
          <label for="first_name">Vorname:</label>
          <input v-model="formData.first_name" required>
        <hr>
          <button type="submit">Bestätigen</button>
          <button @click="closeModal">Abbrechen</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isVisible = ref(false);
  const formData = ref({
    first_name: '',
    last_name: "",
    email: "",
    ip_address: "",
    isbn: "",
    credit_card: "",
    iban: "",
    money: "",
    bitcoin_address: "",
    street_address: "",
    street_name: "",
    street_number: ""
  });
  
  const closeModal = () => {
    isVisible.value = false;
  };
  
  const addUser = () => {
  
  datensaetze.value.push({
    id: datensaetze.value.length + 1, 
    ...formData.value,
  });

  closeModal(); 
};
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  </style>
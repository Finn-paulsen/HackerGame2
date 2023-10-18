<template>
  <TheLogin v-if="!userData.user" />

  <div v-else class="tool-icons" id="tool-icons">

    <div id="datenbankIcon" class="icon" data-name="Datenbank" @click="toggleDatenbankFenster">
      <img src="../Bilder/database.png" alt="Datenbank Icon" />
      <p>Database</p>
    </div>

    <div id="filesIcon" class="icon" data-name="Files" @click="zeigeFiles">
      <img src="../Bilder/files.png" alt="Files Icon" />
      <p>Files</p>
    </div>

    <div id="mainserverIcon" class="icon" data-name="Main Server" onclick="zeigeMainServer()">
      <img src="../Bilder/main-server.png" alt="Main-Server Icon" />
      <p>Main-Server</p>
    </div>

    <div id="newterminal" class="icon" data-name="New Terminal" @click="userData.toggleDarkTerminal()">
      <img src="../Bilder/new-terminal.png" alt="New-Terminal Icon" />
      <p>Dark Terminal</p>
    </div>

    <div id="remoteconnectionIcon" class="icon" data-name="Remote Connection" @click="zeigeremoteconnection">
      <img src="../Bilder/remote-connection.png" alt="Remote-Connection Icon" />
      <p>Remote Connection</p>
    </div>

    <button v-show="isDatabaseOpen" class="add-user-button" @click="openAddUserModal">Add User</button>
    <Searchdata v-show="isDatabaseOpen && isSearchFieldOpen" :datensaetze="datensaetze" :toggleDatenbankFenster="toggleDatenbankFenster" :isSerchdataopen="isSearchFieldOpen" />
  <AddUserModal :isVisible="isAddUserModalOpen" />
  <DarkTerminal v-if="userData.isDarkTerminalModalActive" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { userStore } from "../store/user";

import TheLogin from "../components/TheLogin.vue";
import Searchdata from "../components/Searchdata.vue";
import datensaetzeData from '../assets/MOCK_DATA.json';
import DarkTerminal from '../components/DarkTerminal.vue';
import AddUserModal from '../components/AddUserModal.vue';

const datensaetze = ref(datensaetzeData);
const showFiles = ref(false);
const userData = userStore();
const ergebnisse = ref([]);

const isAddUserModalOpen = ref(false);

const openAddUserModal = () => {
  isAddUserModalOpen.value = true;
};



const zeigeFiles = () => {
  showFiles.value = !showFiles.value;
};

const isDatabaseOpen = ref(false);
const isSearchFieldOpen = ref(false);

const toggleDatenbankFenster = () => {
  isDatabaseOpen.value = !isDatabaseOpen.value;

 
  if (!isDatabaseOpen.value) {
    filterInput.value = "";
    ergebnisse.value = [];
    isSearchFieldOpen.value = false; 
  }
};

const sucheNachName = () => {
  
  if (filterInput.trim() !== '') {
    ergebnisse.value = datensaetze.value.filter((datensatz) =>
      datensatz.first_name.toLowerCase().includes(filterInput.toLowerCase())
    );
  } else {
    
    console.error("Please enter a name.");
    
  }
};

const addUser = () => {
  datensaetze.value.push({
    id: datensaetze.value.length + 1,
    ...formData.value,
  });

  closeModal(); 
};



</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Anonymous Pro', monospace;

}

.icon-container {
  position: fixed;
  top: 10px;
  left: 10px;
  cursor: pointer;
  z-index: 2;
}

.icon-container img {
  width: 100px;
  height: auto;
}

.inputForm {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;
}

.terminal-container {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45rem;
  height: 35rem;
  padding: 20px;
  background-color: #000;
  color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1;
  box-sizing: border-box;
}

.terminal-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.terminal-body {
  margin-top: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: calc(100% - 20px);
  padding: 8px;
  margin-bottom: 10px;
}

button {
  padding: 8px 15px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.tool-icons {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  z-index: 2;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#icons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon img {
  width: 80px;
  height: auto;
}

#app div {
  text-align: center;
}

#app img {
  width: 50px;
  height: auto;
}

#app p {
  margin: 0;
  color: white;
  font-size: 12px;
}

.icon p {
  margin: 0;
  color: black;
  font-size: 12px;
}

#datenbankFenster {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #282c34; 
  padding: 20px;
  border-radius: 10px; 
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  z-index: 3;
}

#datenbankFenster button {
  margin-top: 20px; 
  background-color: #61dafb; 
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px; 
}

#datenbankFenster button:hover {
  background-color: #4fa3d1; 
}

#datenbankFenster input {
  margin-top: 10px; 
  padding: 12px;
  width: 100%; 
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

#datenbankIcon {
  position: fixed;
  top: 10px;
  left: 70px;
  margin-right: 10px;
}

.ergebnis-container {
  margin-top: 20px;
}

.datensatz {
  color: white;
}

.datensatz p {
  margin: 0;
  max-width: 500px;
}

.datentyp {
  margin-right: 10px;
}

hr {
  margin-top: 20px;
  margin-bottom: 5px;
}

.add-user-button {
  background-color: transparent;
  border: 2px solid #ddd;
  padding: 8px 15px;
  color: #ddd;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.add-user-button:hover {
  background-color: #ddd;
  color: #000;
  cursor: pointer;
}
</style>
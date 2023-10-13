<template>
  <TheLogin v-if="!userData.user" />

  <div v-else class="tool-icons" id="tool-icons">
    <div
      id="datenbankIcon"
      class="icon"
      data-name="Datenbank"
      @click="toggleDatenbankFenster"
    >
      <img src="../Bilder/database.png" alt="Datenbank Icon" />
      <p>Database</p>
    </div>

    <div id="filesIcon" class="icon" data-name="Files" @click="zeigeFiles">
      <img src="../Bilder/files.png" alt="Files Icon" />
      <p>Files</p>
    </div>

    <div
      id="mainserverIcon"
      class="icon"
      data-name="Main Server"
      onclick="zeigeMainServer()"
    >
      <img src="../Bilder/main-server.png" alt="Main-Server Icon" />
      <p>Main-Server</p>
    </div>

    <div
      id="newterminal"
      class="icon"
      data-name="New Terminal"
      onclick="zeigenewterminal()"
    >
      <img src="../Bilder/new-terminal.png" alt="New-Terminal Icon" />
      <p>Dark Terminal</p>
    </div>

    <div
      id="remoteconnectionIcon"
      class="icon"
      data-name="Remote Connection"
      onclick="zeigeremoteconnection()"
    >
      <img src="../Bilder/remote-connection.png" alt="Remote-Connection Icon" />
      <p>Remote Connection</p>
    </div>
    <Searchdata/>
  </div>
  
</template>
 
<script setup>
import { ref } from "vue";
import { userStore } from "../store/user";

import TheLogin from "../components/TheLogin.vue";
import Searchdata from "../components/Searchdata.vue"

const showFiles = ref(false);
const userData = userStore();
const ergebnisse = ref([]);
const datensaetze = ref([
  {
    name: "Max Mustermann",
    adresse: "Musterstraße 123, 12345 Musterstadt",
    iban: "DE89370400440532013000",
    email: "max.mustermann@example.com",
  },
]);

const zeigeFiles = () => {
  showFiles.value = !showFiles.value;
};

const toggleDatenbankFenster = () => {
  const datenbankFenster = document.getElementById("datenbankFenster");
  datenbankFenster.style.display = "block";
  ergebnisse.value = [];
};

const sucheNachName = () => {
  const filterInput = document.getElementById("filter-input");
  const gesuchterName = filterInput.value.toLowerCase();
  ergebnisse.value = datensaetze.value.filter((datensatz) =>
    datensatz.name.toLowerCase().includes(gesuchterName)
  );

  ergebnisContainer.innerHTML = "";
  gefunden.forEach((datensatz) => {
    const datensatzElement = document.createElement("p");
    datensatzElement.textContent = `${datensatz.name}, ${datensatz.adresse}, ${datensatz.iban}, ${datensatz.email}`;
    datensatzElement.style.color = "black";
    ergebnisContainer.appendChild(datensatzElement);
  });

  toggleDatenbankFenster();
};
</script>
 
<style>
body {
  margin: 0;
  background-color: #ffffff;
  color: black;
  font-family: "Courier New", monospace;

  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
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

.versteckt {
  display: none;
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
  background-color: #111;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  z-index: 3;
  display: none;
  background: linear-gradient(to right, #111 0%, #000 100%);
  animation: backgroundAnimation 5s linear infinite;
  height: auto;
  padding-bottom: 20px;
}

@keyframes backgroundAnimation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

#datenbankFenster button {
  margin-top: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 8px 15px;
  font-size: 14px;
  animation: glowAnimation 1s infinite alternate;
}

@keyframes glowAnimation {
  0% {
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.8);
  }
  100% {
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.8);
  }
}

#datenbankFenster input {
  animation: pulseAnimation 1.5s infinite;
}

@keyframes pulseAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
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
</style>
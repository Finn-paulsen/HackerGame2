<template>
  <div>
    <div class="dark-terminal" id="output" v-show="showDarkTerminal">
      <div v-for="(message, index) in messages" :key="index" class="terminal-message">{{ message }}</div>
      <form @submit.prevent="executeCommand">
  <input v-model="command" placeholder="Please enter a command..." />
</form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const command = ref('');
const messages = ref([]);
const loading = ref(false);
const showDarkTerminal = ref(true);
const confirmationPending = ref(false); // Neues Ref für die Bestätigung

// Beispiel-Passwortliste
const passwordList = [
  'pass123',
  'securePassword',
  'letMeIn123',
  // ... füge weitere Passwörter hinzu
];

const password = ref('dasIstEinTestPassword'); // Jetzt als Ref definieren

const toggleDarkTerminal = () => {
  showDarkTerminal.value = !showDarkTerminal.value;
};

// Funktion für das Knacken des Passworts
const crackPassword = (passwordList) => {
  // ... (füge hier deine Logik für das Knacken des Passworts ein)
};

// Funktion für den Start des Passwort-Crackers
const startPasswordCracker = () => {
  let timeToCrack = 0;
  crackPassword(passwordList);
};

// Funktion für die Animation des Crackings
const animateCracking = () => {
  attemptCrack(passwordList, 0);
};

// Funktion für den Crack-Versuch
const attemptCrack = (passwords, currentIndex) => {
  if (currentIndex < passwords.length) {
    const currentPassword = passwords[currentIndex];
    messages.value.push(`Attempting to crack password: ${currentPassword}`);

    // Hier kommt der Code für die Passwortprüfung hin

    // Simuliere den nächsten Versuch nach 2 Sekunden
    setTimeout(() => {
      attemptCrack(passwords, currentIndex + 1);
    }, 2000);
  } else {
    // Alle Passwörter versucht
    loading.value = false;
    messages.value.push('Password crack failed.');
  }
};

// Funktion für die Bestätigungsabfrage im Terminal
const askConfirmation = () => {
  messages.value.push("Are you sure you want to start the password cracker? (y/n)");
  confirmationPending.value = true; // Setze die Bestätigung ausstehend
};

// Funktion für die Ausführung des Befehls
const executeCommand = () => {
  if (!command.value.trim()) return;

  loading.value = true;
  messages.value.push("Executing command...");
  executeCommandLogic();
};

// Funktion für die Logik der Befehlsausführung
const executeCommandLogic = () => {
  if (confirmationPending.value) {
    // Nur wenn die Bestätigung ausstehend ist
    startPasswordCracker();
    animateCracking();
    confirmationPending.value = false; // Setze die Bestätigung aufgelöst
  } else {
    messages.value.push('Command not allowed without confirmation.');
  }

  setTimeout(() => {
    if (command.value.toLowerCase() === "getdata") {
      messages.value.push("Data retrieved successfully!");
    } else if (command.value.toLowerCase() === "crackpassword") {
      // Stelle eine Abfrage im Terminal
      askConfirmation();
    } else {
      messages.value.push(`Error: Command not recognized - ${command.value}`);
    }

    command.value = "";
  }, 1500);
};

// Funktion für die Zeitberechnung zum Knacken des Passworts
const calculateTimeToCrack = () => {
  let timeToCrack = 0;

  const complexityFactors = {
    length: password.value.length,
    uppercase: /[A-Z]/.test(password.value),
    lowercase: /[a-z]/.test(password.value),
    digits: /\d/.test(password.value),
    specialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password.value),
  };

  if (complexityFactors.length < 8) {
    timeToCrack += 2;
  } else {
    timeToCrack += 5;
  }

  if (complexityFactors.uppercase) timeToCrack += 3;
  if (complexityFactors.lowercase) timeToCrack += 3;
  if (complexityFactors.digits) timeToCrack += 4;
  if (complexityFactors.specialChars) timeToCrack += 5;

  return timeToCrack;
};

// Setze die Zeit zum Knacken
const timeToCrack = calculateTimeToCrack();
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
  
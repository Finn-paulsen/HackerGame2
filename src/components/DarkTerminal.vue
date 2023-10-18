<template>
  <div>
    <div class="custom-terminal" id="output" v-show="showCustomTerminal">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="terminal-message"
      >
        {{ message }}
      </div>
      <form @submit.prevent="executeCommandForm">
        <input
          v-model="command"
          ref="commandInput"
          placeholder="Please enter a command..."
          @keydown.enter="executeCommandInput"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import passwordList from "../assets/PASSWORD_LIST.json";
const messages = ref([]);
const loading = ref(false);
const confirmationPending = ref(false);
const passwordKey = ref("dasIstEinTestPassword");
const command = ref("");
const showCustomTerminal = ref(true);

const toggleCustomTerminal = () => {
  showCustomTerminal.value = !showCustomTerminal.value;
};

const commandHistory = ref([]);
let commandHistoryIndex = ref(-1);

const crackPassword = (passwordList) => {
  const targetPassword = passwordKey.value;

  for (const passwordItem of passwordList) {
    const currentPassword = passwordItem.password;

    if (currentPassword === targetPassword) {
      messages.value.push(`Password cracked: ${currentPassword}`);
      return true;
    }
  }

  return false;
};

const startPasswordCracker = () => {
  let timeToCrack = 0;
  crackPassword(passwordList);
};

const animateCracking = () => {
  attemptCrack(passwordList, 0);
};

const attemptCrack = (passwords, currentIndex) => {
  if (currentIndex < passwords.length) {
    const currentPassword = passwords[currentIndex];
    messages.value.push(`Attempting to crack password: ${currentPassword}`);

    setTimeout(() => {
      attemptCrack(passwords, currentIndex + 1);
    }, 2000);
  } else {
    loading.value = false;
    messages.value.push("Password crack failed.");
  }
};

const askConfirmation = () => {
  messages.value.push(
    "Are you sure you want to start the password cracker? (y/n)"
  );
  confirmationPending.value = true;
};

const clearConsole = () => {
  messages.value = [];
};

const addToCommandHistory = (command) => {
  commandHistory.value.unshift(command);
  commandHistoryIndex.value = -1;
};

const executeCommandLogic = () => {
  if (confirmationPending.value) {
    startPasswordCracker();
    animateCracking();
    confirmationPending.value = false;
  } else {
    if (command.value.toLowerCase() === "cls") {
      clearConsole();
    } else if (command.value.toLowerCase() === "history") {
      messages.value.push("Command History:");
      commandHistory.value.forEach((cmd, index) => {
        messages.value.push(`${index + 1}. ${cmd}`);
      });
    } else if (command.value.toLowerCase() === "clearhistory") {
      commandHistory.value = [];
      messages.value.push("Command History cleared.");
    } else if (command.value.toLowerCase() === "crackpassword") {
      askConfirmation();
    }
  }

  setTimeout(() => {
    if (command.value.toLowerCase() === "getdata") {
      messages.value.push("Data retrieved successfully!");
    }

    command.value = "";
  }, 1500);
};

const navigateCommandHistory = (direction) => {
  const newIndex = commandHistoryIndex.value + direction;
  if (newIndex >= 0 && newIndex < commandHistory.value.length) {
    commandHistoryIndex.value = newIndex;
    command.value = commandHistory.value[newIndex];
  }
};

const executeCommandForm = () => {
  if (!command.value.trim()) return;

  addToCommandHistory(command.value);

  loading.value = true;
  executeCommandLogic();
};

const executeCommandInput = () => {
  executeCommandForm();
};

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    navigateCommandHistory(1);
  } else if (event.key === "ArrowDown") {
    navigateCommandHistory(-1);
  }
});

const calculateTimeToCrack = () => {
  const complexityFactors = {
    length: passwordKey.value.length,
    uppercase: /[A-Z]/.test(passwordKey.value),
    lowercase: /[a-z]/.test(passwordKey.value),
    digits: /\d/.test(passwordKey.value),
    specialChars: /[!@#$%^&*(),.?":{}|<>]/.test(passwordKey.value),
  };

  let timeToCrack = 0;

  if (complexityFactors.length < 8) {
    timeToCrack += 2;
  } else {
    timeToCrack += 5;
  }

  timeToCrack += complexityFactors.uppercase ? 3 : 0;
  timeToCrack += complexityFactors.lowercase ? 3 : 0;
  timeToCrack += complexityFactors.digits ? 4 : 0;
  timeToCrack += complexityFactors.specialChars ? 5 : 0;

  return timeToCrack;
};

const timeToCrack = calculateTimeToCrack();
</script>

<style scoped>
.custom-terminal {
  background-color: #0f0f0f;
  padding: 20px;
  border-radius: 5px;
  width: 600px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  color: #00ff00;
  font-family: "Anonymous Pro", monospace;
}

#output {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #00ff00;
  padding: 10px;
  margin-bottom: 10px;
}

.terminal-message {
  margin-bottom: 5px;
  color: #00ff00;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  box-sizing: border-box;
  background-color: #0f0f0f;
  color: #00ff00;
  border: none;
  border-bottom: 1px solid #00ff00;
  font-family: "Anonymous Pro", monospace;
  margin: 0;
}
</style>

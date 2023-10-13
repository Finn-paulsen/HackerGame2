<template>
    <div v-if="showCmdWindow" id="dark-terminal">
        <div id="output">
            <div v-for="(message, index) in messages" :key="index" class="terminal-message">{{ message }}</div>
        </div>
        <input v-model="command" @keydown.enter="executeCommand" placeholder="Enter command..." />
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            command: '',
            messages: [],
            loading: false,
        };
    },
    methods: {
        executeCommand() {
            if (!this.command.trim()) return;

            this.loading = true;
            this.messages.push('Executing command...');

            // Simulate command execution
            setTimeout(() => {
                this.messages.pop(); // Remove 'Executing command...' message
                this.loading = false;

                // Simulate different commands
                if (this.command.toLowerCase() === 'getdata') {
                    this.messages.push('Data retrieved successfully!');
                } else {
                    this.messages.push(`Error: Command not recognized - ${this.command}`);
                }

                this.command = ''; // Clear input
            }, 1500);
        },
    },
    props: {
        showCmdWindow: Boolean,
    },
};
</script>
  
<style scoped>
#dark-terminal {
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
  
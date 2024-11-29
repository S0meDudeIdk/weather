const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const readline = require('readline');

// Array of server objects with names and paths
const servers = [
  {
    name: 'Dashboard v2.0',
    path: path.resolve(__dirname, '../Dashboard v2.0/server/index.js'),
  },
  {
    name: 'General',
    path: path.resolve(__dirname, '../General/server/index.js'),
  },
  {
    name: 'Login database - Prototype for users',
    path: path.resolve(__dirname, '../Login database - Prototype for users/server/index.js'),
  },
];

// Directory to store PID files
const pidDir = path.join(__dirname, 'pids');

// Ensure PID directory exists
if (!fs.existsSync(pidDir)) {
  fs.mkdirSync(pidDir);
}

// Function to start a server
function startServer(index) {
  const server = servers[index];
  if (!server) {
    console.log(`Invalid server number: ${index + 1}`);
    return;
  }

  const pidFile = path.join(pidDir, `${index}.pid`);
  if (fs.existsSync(pidFile)) {
    console.log(`Server '${server.name}' is already running.`);
    return;
  }

  const serverProcess = spawn('node', [server.path], {
    detached: true,
    stdio: 'ignore',
  });

  fs.writeFileSync(pidFile, serverProcess.pid.toString());
  serverProcess.unref();
  console.log(`Started server '${server.name}' with PID ${serverProcess.pid}.`);
}

// Function to stop a server
function stopServer(index) {
  const server = servers[index];
  if (!server) {
    console.log(`Invalid server number: ${index + 1}`);
    return;
  }

  const pidFile = path.join(pidDir, `${index}.pid`);
  if (!fs.existsSync(pidFile)) {
    console.log(`Server '${server.name}' is not running.`);
    return;
  }

  const pid = parseInt(fs.readFileSync(pidFile, 'utf8'), 10);
  try {
    process.kill(pid);
    fs.unlinkSync(pidFile);
    console.log(`Stopped server '${server.name}'.`);
  } catch (error) {
    console.error(`Failed to stop server '${server.name}':`, error.message);
  }
}

function stopAllServers() {
  servers.forEach((server, index) => {
    stopServer(index);
  });
}


// Function to check server status
function statusServer(index) {
  const server = servers[index];
  if (!server) {
    console.log(`Invalid server number: ${index + 1}`);
    return;
  }

  const pidFile = path.join(pidDir, `${index}.pid`);
  if (!fs.existsSync(pidFile)) {
    console.log(`Server '${server.name}' is not running.`);
    return;
  }

  const pid = parseInt(fs.readFileSync(pidFile, 'utf8'), 10);
  try {
    process.kill(pid, 0);
    console.log(`Server '${server.name}' is running with PID ${pid}.`);
  } catch (error) {
    console.log(`Server '${server.name}' is not running.`);
    fs.unlinkSync(pidFile);
  }
}

// Function to restart a server
function restartServer(index) {
  const server = servers[index];
  if (!server) {
    console.log(`Invalid server number: ${index + 1}`);
    return;
  }

  console.log(`Restarting server '${server.name}'...`);

  stopServer(index);
  startServer(index);
}

// Function to display the menu
function displayMenu() {
  console.log('\nAvailable Servers:');
  servers.forEach((server, index) => {
    console.log(`${index + 1}. ${server.name}`);
  });
  console.log('\nCommands:');
  console.log('start <number>   - Start a server');
  console.log('stop <number>    - Stop a server');
  console.log('status <number>  - Check server status');
  console.log('restart <number> - Restart a server');
  console.log('exit             - Exit the program\n');
}

// Function to prompt for commands
function promptCommand() {
  rl.question('Command: ', (input) => {
    handleCommand(input.trim());
  });
}

// Function to handle commands
function handleCommand(input) {
  const [command, arg] = input.split(' ');
  const index = parseInt(arg, 10) - 1;

  if (command === 'exit') {
    stopAllServers();
    rl.close();
    return;
  }

  if (['start', 'stop', 'status', 'restart'].includes(command)) {
    if (isNaN(index) || index < 0 || index >= servers.length) {
      console.log('Invalid server number.');
    } else {
      switch (command) {
        case 'start':
          startServer(index);
          break;
        case 'stop':
          stopServer(index);
          break;
        case 'status':
          statusServer(index);
          break;
        case 'restart':
          restartServer(index);
          break;
      }
    }
  } else {
    console.log('Invalid command. Please use start, stop, status, restart, or exit.');
  }

  promptCommand();
}

// Set up readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Start the interactive prompt
displayMenu();
promptCommand();
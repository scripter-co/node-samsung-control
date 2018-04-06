const mappings = require('./mappings');
const WebSocket = require('ws');
const readline = require('readline');

const IP = '192.168.1.100';
const PORT = 8001;
const ws = new WebSocket(`ws://${IP}:${PORT}/api/v2/channels/samsung.remote.control`);

const stdin = process.openStdin();
const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function getCommand(keyPress) {
  const command = {
    method: 'ms.remote.control',
    params: {
      Cmd: 'Click',
      DataOfCmd: keyPress,
      Option: 'false',
      TypeOfRemote: 'SendRemoteKey'
    }
  };

  return JSON.stringify(command);
}

function processLineEntry(input) {
  const keyPress = mappings[input]
  if (keyPress) {
    ws.send(getCommand(keyPress));
  }
}

function listenForCommands() {
  readLine.on('line', processLineEntry);
}

ws.on('open', listenForCommands);


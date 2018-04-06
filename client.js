const { resolve } = require('path');
const WebSocket = require('ws');
const readline = require('readline');

const mappings = require(resolve(__dirname, './mappings'));

const IP = '192.168.1.100';
const PORT = 8001;

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

function sendCommand(input) {
  const keyPress = mappings[input]
  if (keyPress) {
    connection.send(getCommand(keyPress));
  }
}

function listenForCommands() {
  readLine.on('line', sendCommand);
}

let connection;
function connect() {
  return new Promise((resolve) => {
    connection = new WebSocket(`ws://${IP}:${PORT}/api/v2/channels/samsung.remote.control`);
    connection.on('open', () => {
      listenForCommands();
      resolve();
    });
  });
}

function disconnect() {
  if (connection) {
    connection.close();
    readLine.close();
    connection = undefined;
  }
}

module.exports = {
  connect,
  disconnect,
  sendCommand
};

#!/usr/bin/env node

const { resolve } = require('path');
const { connect, sendCommand, disconnect } = require(resolve(__dirname, './client'));

connect()
  .then(() => sendCommand(process.argv[2]))
  .then(() => disconnect());

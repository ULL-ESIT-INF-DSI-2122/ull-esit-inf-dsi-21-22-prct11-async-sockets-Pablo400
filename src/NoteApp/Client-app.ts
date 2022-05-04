/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import * as yargs from 'yargs';
import {RequestType} from './types';
import {Client} from './client';

let request: RequestType;

// Add Note
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    request = {
      type: 'add',
      user: `${argv.user}`,
      title: `${argv.title}`,
      body: `${argv.body}`,
      color: `${argv.color}`};

    const client = new Client(request);
    client.client();
  },
});

// Modify Note
yargs.command({
  command: 'modify',
  describe: 'Modify an existing Note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    request = {
      type: 'update',
      user: `${argv.user}`,
      title: `${argv.title}`,
      body: `${argv.body}`};

    const client = new Client(request);
    client.client();
  },
});

// Remove Note
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    request = {type: 'remove',
      user: `${argv.user}`,
      title: `${argv.title}`};

    const client = new Client(request);
    client.client();
  },
});

// List Notes
yargs.command({
  command: 'list',
  describe: 'List all notes',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    request = {type: 'list',
      user: `${argv.user}`};

    const client = new Client(request);
    client.client();
  },
});

// Read Note
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    request = {type: 'read',
      user: `${argv.user}`,
      title: `${argv.title}`};

    const client = new Client(request);
    client.client();
  },
});

yargs.parse();



/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import * as yargs from 'yargs';
import {RequestType} from './types';

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
    const request: RequestType = {
      type: 'add',
      user: `${argv.user}`,
      title: `${argv.title}`,
      body: `${argv.body}`,
      color: `${argv.color}`};

    console.log(JSON.parse(JSON.stringify(request)));
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
    const request: RequestType = {
      type: 'update',
      user: `${argv.user}`,
      title: `${argv.title}`,
      body: `${argv.body}`};
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
    const request: RequestType = {type: 'remove',
      user: `${argv.user}`,
      title: `${argv.title}`};
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
    const request: RequestType = {type: 'list',
      user: `${argv.user}`};
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
    const request: RequestType = {type: 'read',
      user: `${argv.user}`,
      title: `${argv.title}`};
  },
});

yargs.parse();

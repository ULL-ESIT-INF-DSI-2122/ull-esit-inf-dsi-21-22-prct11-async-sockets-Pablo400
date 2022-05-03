/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

import * as yargs from 'yargs';
import {addNoteCallback} from './NoteOperations/addNote';
import {ModifyNote} from './NoteOperations/modifyNote';
import {RemoveNote} from './NoteOperations/removeNote';
import {ListNotes} from './NoteOperations/listNotes';
import {ReadNotes} from './NoteOperations/readNotes';


// const addNote = new AddNote();
const modifyNote = new ModifyNote();
const removeNote = new RemoveNote();
const listNotes = new ListNotes();
const readNote = new ReadNotes();

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
    // addNote.addNote(`${argv.user}`, `${argv.title}`, `${argv.body}`, `${argv.color}`);
    addNoteCallback(`${argv.user}`, `${argv.title}`, `${argv.body}`, `${argv.color}`, (err, correct) => {
      if (err) {
        console.log(err);
      } else if (correct) {
        console.log(correct);
      }
    });
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
    modifyNote.modifyNote(`${argv.user}`, `${argv.title}`, `${argv.body}`);
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
    removeNote.removeNote(`${argv.user}`, `${argv.title}`);
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
    listNotes.listNotes(`${argv.user}`);
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
    readNote.readNote(`${argv.user}`, `${argv.title}`);
  },
});

yargs.parse();


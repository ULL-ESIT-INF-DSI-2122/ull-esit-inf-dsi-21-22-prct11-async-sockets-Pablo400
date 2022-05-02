"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = __importStar(require("yargs"));
const addUserDirectory_1 = require("./NoteOperations/addUserDirectory");
const addNote_1 = require("./NoteOperations/addNote");
const modifyNote_1 = require("./NoteOperations/modifyNote");
const removeNote_1 = require("./NoteOperations/removeNote");
const listNotes_1 = require("./NoteOperations/listNotes");
const readNotes_1 = require("./NoteOperations/readNotes");
const addUser = new addUserDirectory_1.AddUserDirectory();
const addNote = new addNote_1.AddNote();
const modifyNote = new modifyNote_1.ModifyNote();
const removeNote = new removeNote_1.RemoveNote();
const listNotes = new listNotes_1.ListNotes();
const readNote = new readNotes_1.ReadNotes();
// Add User
yargs.command({
    command: 'addUser',
    describe: 'Adds a user to the system',
    builder: {
        user: {
            describe: 'User name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        addUser.addUserDirectory(`${argv.user}`);
    },
});
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
        addNote.addNote(`${argv.user}`, `${argv.title}`, `${argv.body}`, `${argv.color}`);
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

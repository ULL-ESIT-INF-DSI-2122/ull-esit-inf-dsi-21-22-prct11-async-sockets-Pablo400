/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import * as net from 'net';
import {AddNote} from './NoteOperations/addNote';
import {ModifyNote} from './NoteOperations/modifyNote';
import {RemoveNote} from './NoteOperations/removeNote';
import {ListNotes} from './NoteOperations/listNotes';
import {ReadNotes} from './NoteOperations/readNotes';

const addNote = new AddNote();
const modifyNote = new ModifyNote();
const removeNote = new RemoveNote();
const listNotes = new ListNotes();
const readNote = new ReadNotes();

/**
 * Server class
 */
export class Server {
  /**
   * Server constructor
   */
  constructor() { }

  /**
   * Server functions
   */
  server() {
    net.createServer({allowHalfOpen: true}, (connection) => {
      console.log('A client has connected.');

      let clientData = '';
      connection.on('data', (dataChunk) => {
        clientData += dataChunk.toString();
        this.serverData(clientData, connection);
      });
    }).listen(60300, () => {
      console.log('Waiting for clients to connect.');
    });
  }

  serverData(clientData: string, connection: any) {
    const jsonClientData = JSON.parse(clientData);
    if (jsonClientData.type === 'add') {
      addNote.addNoteCallback(`${jsonClientData.user}`, `${jsonClientData.title}`, `${jsonClientData.body}`, `${jsonClientData.color}`, (err, correct) => {
        if (err) {
          connection.write(JSON.stringify(err));
        } else if (correct) {
          connection.write(JSON.stringify(correct));
        }
        connection.end();
      });
    } else if (jsonClientData.type === 'update') {
      modifyNote.modifyNoteCallback(`${jsonClientData.user}`, `${jsonClientData.title}`, `${jsonClientData.body}`, (err, correct) => {
        if (err) {
          connection.write(JSON.stringify(err));
        } else if (correct) {
          connection.write(JSON.stringify(correct));
        }
        connection.end();
      });
    } else if (jsonClientData.type === 'remove') {
      removeNote.removeNoteCallback(`${jsonClientData.user}`, `${jsonClientData.title}`, (err, correct) => {
        if (err) {
          connection.write(JSON.stringify(err));
        } else if (correct) {
          connection.write(JSON.stringify(correct));
        }
        connection.end();
      });
    } else if (jsonClientData.type === 'read') {
      readNote.readNoteCallback(`${jsonClientData.user}`, `${jsonClientData.title}`, (err, correct) => {
        if (err) {
          connection.write(JSON.stringify(err));
        } else if (correct) {
          connection.write(JSON.stringify(correct));
        }
        connection.end();
      });
    } else if (jsonClientData.type === 'list') {
      listNotes.listNoteCallback(`${jsonClientData.user}`, (err, correct) => {
        if (err) {
          connection.write(JSON.stringify(err));
        } else if (correct) {
          connection.write(JSON.stringify(correct));
        }
        connection.end();
      });
    }
  }
}

const server = new Server();
server.server();


/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';

import {AddNote} from '../src/NoteApp/NoteOperations/addNote';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';
import {ResponseType} from '../src/NoteApp/types';

const color = new ChalkColor();
const addNote = new AddNote();
let response: ResponseType = {
  type: 'add',
  success: false,
};

describe('Add Note Test', () => {
  // Funciona
  it('Ese usuario no existe', (done) => {
    addNote.addNoteCallback('eduardo', 'prueba3', 'Esto es una fiesta', 'red', (err, _) => {
      response = {type: 'add', success: false, error: color.getColor('red', 'Ese usuario no existe')};
      if (err) {
        expect(err).to.be.eql(response);
        done();
      }
    });
  });
  it('Nota vacía', (done) => {
    addNote.addNoteCallback('pablo', '', 'Esto es una fiesta', 'marrón', (err, _) => {
      response = {type: 'add', success: false, error: color.getColor('red', 'No se puede crear una nota vacía')};
      if (err) {
        expect(err).to.be.eql(response);
        done();
      }
    });
  });
  it('Ese color no existe', (done) => {
    addNote.addNoteCallback('pablo', 'prueba3', 'Esto es una fiesta', 'marrón', (err, _) => {
      response = {type: 'add', success: false,
        error: color.getColor('red', 'No se puede crear una nota si no se le indican un color, use: red, green, yellow o blue como colores')};
      if (err) {
        expect(err).to.be.eql(response);
        done();
      }
    });
  });
  // No funciona
  it('Esa nota ya existe', (done) => {
    addNote.addNoteCallback('pablo', 'prueba3', 'Esto es una fiesta', 'red', (err, _) => {
      response = {type: 'add', success: false, error: color.getColor('red', 'Esa nota ya existe')};
      if (err) {
        expect(err).to.be.eql(response);
        done();
      }
    });
  });
  it('Crear Nota', (done) => {
    addNote.addNoteCallback('pablo', 'prueba4', 'Esto es una fiesta', 'red', (_, data) => {
      response = {
        type: 'add',
        success: true,
        notes: [{title: 'prueba4', body: 'Esto es una fiesta', color: 'red'}],
      };
      if (data) {
        expect(data).to.be.eql(response);
        fs.unlinkSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/pablo/prueba4.json`);
        done();
      }
    });
  });
});

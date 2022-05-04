/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';

import {AddNote} from '../src/NoteApp/NoteOperations/addNote';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';

const color = new ChalkColor();
const addNote = new AddNote();

describe('Add Note Test', () => {
  it('Esa nota ya existe', (done) => {
    addNote.addNoteCallback('pablo', 'prueba3', 'Esto es una fiesta', 'red', (_, data) => {
      if (data) {
        expect(data).to.be.equal(color.getColor('red', 'Esa nota ya existe'));
        done();
      }
    });
  });
  it('Ese color no existe', (done) => {
    addNote.addNoteCallback('pablo', 'prueba3', 'Esto es una fiesta', 'marrón', (_, data) => {
      if (data) {
        expect(data).to.be.equal(color.getColor('red', 'No se puede crear una nota si no se le indican un color, use: red, green, yellow o blue como colores'));
        done();
      }
    });
  });
  it('Nota vacía', (done) => {
    addNote.addNoteCallback('pablo', '', 'Esto es una fiesta', 'marrón', (_, data) => {
      if (data) {
        expect(data).to.be.equal(color.getColor('red', 'No se puede crear una nota vacía'));
        done();
      }
    });
  });
  it('Esa nota ya existe', (done) => {
    addNote.addNoteCallback('pablo', 'prueba4', 'Esto es una fiesta', 'red', (_, data) => {
      if (data) {
        expect(data).to.be.equal(color.getColor('green', 'La nota se ha creado de forma satisfactoria'));
        fs.unlinkSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/pablo/prueba4.json`);
        done();
      }
    });
  });
});

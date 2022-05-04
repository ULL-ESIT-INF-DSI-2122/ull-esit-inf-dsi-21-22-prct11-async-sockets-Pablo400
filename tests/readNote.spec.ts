/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';

import {ReadNotes} from '../src/NoteApp/NoteOperations/readNotes';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';

const color = new ChalkColor();
const readNote = new ReadNotes();

describe('Read Note Test', () => {
  it('Esa nota no existe', (done) => {
    readNote.readNoteCallback('pablo', 'pablo', (err, _) => {
      if (err) {
        expect(err).to.be.equal(color.getColor('red', 'Esa nota no existe'));
        done();
      }
    });
  });
  it('Lectura de una nota', (done) => {
    readNote.readNoteCallback('pablo', 'prueba3', (err, _) => {
      if (err) {
        expect(err).to.be.equal(`Título: ${color.getColor('red', 'prueba3')} => Contenido: ${color.getColor('red', 'Esto es una fiesta')}`);
        done();
      }
    });
  });
});

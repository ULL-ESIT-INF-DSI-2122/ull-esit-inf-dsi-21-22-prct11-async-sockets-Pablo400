/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';

import {ModifyNote} from '../src/NoteApp/NoteOperations/modifyNote';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';

const color = new ChalkColor();
const modifyNote = new ModifyNote();

describe('Modify Note Test', () => {
  it('Esa nota no existe', (done) => {
    modifyNote.modifyNoteCallback('pablo', 'pablo', 'Hola que tal', (err, _) => {
      if (err) {
        expect(err).to.be.equal(color.getColor('red', 'Esa nota no existe'));
        done();
      }
    });
  });
  it('Modificar la Nota', (done) => {
    modifyNote.modifyNoteCallback('pablo', 'prueba', 'Hola que tal', (_, data) => {
      if (data) {
        expect(data).to.be.equal(color.getColor('green', 'La nota se ha modificado de forma satisfactoria'));
        done();
      }
    });
  });
});

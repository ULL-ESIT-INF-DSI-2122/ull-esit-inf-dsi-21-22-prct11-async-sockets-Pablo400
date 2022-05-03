/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';

import {modifyNoteCallback} from '../src/NoteApp/NoteOperations/modifyNote';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';

const color = new ChalkColor();

describe('Modify Note Test', () => {
  it('Esa nota no existe', (done) => {
    modifyNoteCallback('pablo', 'pablo', 'Hola que tal', (err, _) => {
      if (err) {
        expect(err).to.be.equal(color.getColor('red', 'Esa nota no existe'));
        done();
      }
    });
  });
  it('Modificar la Nota', (done) => {
    modifyNoteCallback('pablo', 'prueba', 'Hola que tal', (_, data) => {
      if (data) {
        expect(data).to.be.equal(color.getColor('green', 'La nota se ha modificado de forma satisfactoria'));
        done();
      }
    });
  });
  it('No se pudo crear la nota', (done) => {
    modifyNoteCallback('pablo', 'prueba', '', (err, _) => {
      if (err) {
        expect(err).to.be.equal(color.getColor('red', 'No se ha podido modificar la nota'));
        done();
      }
    });
  });
});

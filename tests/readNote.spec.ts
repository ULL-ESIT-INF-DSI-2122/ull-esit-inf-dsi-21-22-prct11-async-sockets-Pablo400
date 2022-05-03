/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';

import {readNoteCallback} from '../src/NoteApp/NoteOperations/readNotes';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';

const color = new ChalkColor();

describe('Asynchronous function weatherInfo tests', () => {
  it('Esa nota no existe', (done) => {
    readNoteCallback('pablo', 'pablo', (err, _) => {
      if (err) {
        expect(err).to.be.equal(color.getColor('red', 'Esa nota no existe'));
        done();
      }
    });
  });
  it('Lectura de una nota', (done) => {
    readNoteCallback('pablo', 'prueba3', (_, data) => {
      if (data) {
        expect(data).to.be.equal(`${color.getColor('red', 'prueba3')}, ${color.getColor('red', 'Esto es una fiesta')}`);
        done();
      }
    });
  });
});

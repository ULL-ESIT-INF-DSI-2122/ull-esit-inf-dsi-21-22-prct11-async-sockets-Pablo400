/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';

import {listNoteCallback} from '../src/NoteApp/NoteOperations/listNotes';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';

const color = new ChalkColor();

describe('List Note test', () => {
  it('Ese usuario no existe', (done) => {
    listNoteCallback('eduardo', (err, _) => {
      if (err) {
        expect(err).to.be.equal(color.getColor('red', 'Ese usuario no existe'));
        done();
      }
    });
  });
  it('Ese usuario no existe', (done) => {
    listNoteCallback('ricardo', (_, data) => {
      if (data) {
        expect(data).to.be.equal(color.getColor('green', 'Prueba'));
        done();
      }
    });
  });
  // it('Ese usuario no tiene ninguna nota', (done) => {
  //   listNoteCallback('saul', (err, _) => {
  //     if (err) {
  //       expect(err).to.be.equal(color.getColor('red', 'Ese usuario no tiene ninguna nota'));
  //       done();
  //     }
  //   });
  // });
});

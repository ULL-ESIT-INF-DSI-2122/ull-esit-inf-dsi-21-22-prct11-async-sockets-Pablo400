/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';

import {ReadNotes} from '../src/NoteApp/NoteOperations/readNotes';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';
import {ResponseType} from '../src/NoteApp/types';

const color = new ChalkColor();
const readNote = new ReadNotes();
let response: ResponseType = {
  type: 'add',
  success: false,
};

describe('Read Note Test', () => {
  it('Esa nota no existe', (done) => {
    readNote.readNoteCallback('pablo', 'pablo', (err, _) => {
      response = {type: 'read', success: false, error: color.getColor('red', 'Esa nota no existe')};
      if (err) {
        expect(err).to.be.eql(response);
        done();
      }
    });
  });
  // it('Lectura de una nota', (done) => {
  //   readNote.readNoteCallback('pablo', 'prueba3', (_, data) => {
  //     response = {
  //       type: 'read',
  //       success: true,
  //       notes: [{title: 'prueba3', body: 'Esto es una fiesta', color: 'red'}],
  //     };
  //     if (data) {
  //       expect(data).to.be.eql(response);
  //       done();
  //     }
  //   });
  // });
});

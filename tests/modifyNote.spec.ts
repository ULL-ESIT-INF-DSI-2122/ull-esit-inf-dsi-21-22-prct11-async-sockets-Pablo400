/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';

import {ModifyNote} from '../src/NoteApp/NoteOperations/modifyNote';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';
import {ResponseType} from '../src/NoteApp/types';

const color = new ChalkColor();
const modifyNote = new ModifyNote();
let response: ResponseType = {
  type: 'add',
  success: false,
};

describe('Modify Note Test', () => {
  it('Esa nota no existe', (done) => {
    modifyNote.modifyNoteCallback('pablo', 'pablo', 'Hola que tal', (err, _) => {
      response = {type: 'update', success: false, error: color.getColor('red', 'Ese usuario no existe')};
      if (err) {
        expect(err).to.be.eql(response);
        done();
      }
    });
  });
  it('Modificar la Nota', (done) => {
    modifyNote.modifyNoteCallback('pablo', 'prueba', 'Hola que tal', (_, data) => {
      response = {
        type: 'update',
        success: true,
        notes: [{title: 'prueba', body: 'Hola que tal', color: 'red'}],
      };
      if (data) {
        expect(data).to.be.eql(response);
        done();
      }
    });
  });
});

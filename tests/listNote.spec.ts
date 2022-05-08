/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';

import {ListNotes} from '../src/NoteApp/NoteOperations/listNotes';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';
import {ResponseType} from '../src/NoteApp/types';
// import * as fs from 'fs';

const color = new ChalkColor();
const listNote = new ListNotes();
let response: ResponseType = {
  type: 'add',
  success: false,
};

describe('List Note test', () => {
  it('Ese usuario no existe', (done) => {
    listNote.listNoteCallback('eduardo', (err, _) => {
      response = {type: 'list', success: false, error: color.getColor('red', 'Ese usuario no existe')};
      if (err) {
        expect(err).to.be.eql(response);
        done();
      }
    });
  });
  // it('Listar notas', (done) => {
  //   listNote.listNoteCallback('ricardo', (_, data) => {
  //     response = {
  //       type: 'list',
  //       success: true,
  //       notes: [{title: 'Prueba', body: 'Hola Ricardo', color: 'green'}],
  //     };
  //     if (data) {
  //       expect(data).to.be.eql(response);
  //       done();
  //     }
  //   });
  // });
  // it('Ese usuario no tiene ninguna nota', (done) => {
  //   fs.mkdirSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/prueba');
  //   listNote.listNoteCallback('prueba', (err, _) => {
  //     if (err) {
  //       response = {type: 'list', success: false, error: color.getColor('red', 'Ese usuario no tiene ninguna nota')};
  //       expect(err).to.be.eql(response);
  //       done();
  //     }
  //   });
  //   fs.rmdirSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/prueba`);
  // });
});

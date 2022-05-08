/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';

import {AddUser} from '../src/NoteApp/NoteOperations/addUser';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';
import {ResponseType} from '../src/NoteApp/types';

const color = new ChalkColor();
const addNote = new AddUser();
let response: ResponseType = {
  type: 'add',
  success: false,
};

describe('User Add Test', () => {
  // Funciona
  it('No ha incluido ningún nombre de usuario', (done) => {
    addNote.addUserCallback('', (err, _) => {
      response = {type: 'userAdd', success: false, error: color.getColor('red', 'No ha incluido ningún nombre de usuario')};
      if (err) {
        expect(err).to.be.eql(response);
        done();
      }
    });
  });
  it('Nuevo Usuario', (done) => {
    addNote.addUserCallback('prueba', (_, data) => {
      response = {type: 'userAdd', success: true, user: 'prueba'};
      if (data) {
        expect(data).to.be.eql(response);
        done();
      }
      fs.writeFileSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/prueba/myfile.txt', 'Prueba');
      fs.unlinkSync('/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/prueba/myfile.txt');
      fs.rmdirSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/prueba`);
    });
  });
  it('Ya existe ese usuario', (done) => {
    addNote.addUserCallback('pablo', (error, _) => {
      response = {type: 'userAdd', success: false, error: color.getColor('red', 'Ese usuario ya existe')};
      if (error) {
        expect(error).to.be.eql(response);
        done();
      }
    });
  });
});

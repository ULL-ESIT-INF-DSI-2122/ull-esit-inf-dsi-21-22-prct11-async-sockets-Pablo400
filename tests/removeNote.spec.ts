/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';

import {RemoveNote} from '../src/NoteApp/NoteOperations/removeNote';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';
import {ResponseType} from '../src/NoteApp/types';

const color = new ChalkColor();
const removeNote = new RemoveNote();
let response: ResponseType = {
  type: 'add',
  success: false,
};

describe('Remove Note Test', () => {
  it('Esa nota no existe', (done) => {
    removeNote.removeNoteCallback('pablo', 'pablo', (err, _) => {
      if (err) {
        response = {type: 'remove', success: false, error: color.getColor('red', 'Esa nota no existe')};
        expect(err).to.be.eql(response);
        done();
      }
    });
  });
  it('Nota eliminada', (done) => {
    const json = {
      title: 'prueba2',
      body: 'Prueba',
      color: 'green',
    };
    fs.writeFileSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/pablo/prueba2.json`, JSON.stringify(json, null, 2));
    removeNote.removeNoteCallback('pablo', 'prueba2', (_, data) => {
      response = {
        type: 'remove',
        success: true,
        notes: [json],
      };
      if (data) {
        expect(data).to.be.eql(response);
        done();
      }
    });
  });
});

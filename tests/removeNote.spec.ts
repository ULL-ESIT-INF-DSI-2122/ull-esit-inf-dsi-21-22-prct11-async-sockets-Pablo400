/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';

import {removeNoteCallback} from '../src/NoteApp/NoteOperations/removeNote';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';

const color = new ChalkColor();

describe('Remove Note Test', () => {
  it('Esa nota no existe', (done) => {
    removeNoteCallback('pablo', 'pablo', (err, _) => {
      if (err) {
        expect(err).to.be.equal(color.getColor('red', 'Esa nota no existe'));
        done();
      }
    });
  });
  it('Nota eliminada', (done) => {
    const json: any = {
      title: 'prueba2',
      body: 'Prueba',
      color: 'green',
    };
    fs.writeFileSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/pablo/prueba2.json`, JSON.stringify(json, null, 2));
    removeNoteCallback('pablo', 'prueba2', (_, data) => {
      if (data) {
        expect(data).to.be.equal(color.getColor('green', 'Nota eliminada'));
        done();
      }
    });
  });
});

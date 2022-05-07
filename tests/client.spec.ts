/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
// import * as fs from 'fs';

import {Client} from '../src/NoteApp/client';
import {RequestType} from '../src/NoteApp/types';
import {ResponseType} from '../src/NoteApp/types';
import {ChalkColor} from '../src/NoteApp/NoteOperations/utilities';

const color = new ChalkColor();

const request: RequestType = {
  type: 'add',
  user: 'pablo'};

const addResponse: ResponseType = {
  type: 'add',
  success: true,
  notes: [{title: 'responseTest', body: 'Test', color: 'yellow'}],
};

const modifyResponse: ResponseType = {
  type: 'update',
  success: true,
  notes: [{title: 'responseTest', body: 'Test', color: 'yellow'}],
};

const removeResponse: ResponseType = {
  type: 'remove',
  success: true,
  notes: [{title: 'responseTest', body: 'Test', color: 'yellow'}],
};

const listResponse: ResponseType = {
  type: 'list',
  success: true,
  notes: [{title: 'responseTest', body: 'Test', color: 'yellow'}],
};

const readResponse: ResponseType = {
  type: 'read',
  success: true,
  notes: [{title: 'responseTest', body: 'Test', color: 'yellow'}],
};

const addResponseFailed: ResponseType = {
  type: 'add',
  success: false,
  error: `${color.getColor('red', 'Error')}`,
};

const modifyResponseFailed: ResponseType = {
  type: 'update',
  success: false,
  error: `${color.getColor('red', 'Error')}`,
};

const removeResponseFailed: ResponseType = {
  type: 'remove',
  success: false,
  error: `${color.getColor('red', 'Error')}`,
};

const listResponseFailed: ResponseType = {
  type: 'list',
  success: false,
  error: `${color.getColor('red', 'Error')}`,
};

const readResponseFailed: ResponseType = {
  type: 'read',
  success: false,
  error: `${color.getColor('red', 'Error')}`,
};

const client = new Client(request);
let response: any;

describe('Response Test', () => {
  it('Add Response Test', () => {
    response = JSON.parse(JSON.stringify(addResponse));
    expect(client.printResult(JSON.stringify(addResponse))).to.be.equal(color.getColor('green', `La nota ${response.notes.title} ha sido creada de forma satisfactoria`));
  });
  it('Modify Response Test', () => {
    response = JSON.parse(JSON.stringify(modifyResponse));
    expect(client.printResult(JSON.stringify(modifyResponse))).to.be.equal(color.getColor('green', `La nota ${response.notes.title} ha sido modificada de forma satisfactoria`));
  });
  it('Remove Response Test', () => {
    response = JSON.parse(JSON.stringify(removeResponse));
    expect(client.printResult(JSON.stringify(removeResponse))).to.be.equal(color.getColor('green', `La nota ${response.notes.title} ha sido eliminada de forma satisfactoria`));
  });
  it('List Response Test', () => {
    const titleArray = [];
    const colorArray = [];
    const bodyArray = [];
    response = JSON.parse(JSON.stringify(listResponse));

    for (const note of response.notes) {
      titleArray.push(note.title);
      colorArray.push(note.color);
      bodyArray.push(note.body);
    }

    expect(client.printResult(JSON.stringify(listResponse))).to.be.equal(`${color.getColor(`${colorArray[0]}`, `${titleArray[0]}`)}` + '\n');
  });
  it('Read Response Test', () => {
    const titleArray = [];
    const colorArray = [];
    const bodyArray = [];
    response = JSON.parse(JSON.stringify(readResponse));

    for (const note of response.notes) {
      titleArray.push(note.title);
      colorArray.push(note.color);
      bodyArray.push(note.body);
    }

    expect(client.printResult(JSON.stringify(readResponse))).to.be.equal(`Título: ${color.getColor(`${colorArray[0]}`, `${titleArray[0]}`)} => Contenido: ${color.getColor(`${colorArray[0]}`, `${bodyArray[0]}`)}`);
  });
});

describe('Response Error Test', () => {
  it('Add Response Test', () => {
    response = JSON.parse(JSON.stringify(addResponseFailed));
    expect(client.printResult(JSON.stringify(addResponseFailed))).to.be.equal(color.getColor('red', 'Error'));
  });
  it('Modify Response Test', () => {
    response = JSON.parse(JSON.stringify(modifyResponseFailed));
    expect(client.printResult(JSON.stringify(modifyResponseFailed))).to.be.equal(color.getColor('red', 'Error'));
  });
  it('Remove Response Test', () => {
    response = JSON.parse(JSON.stringify(removeResponseFailed));
    expect(client.printResult(JSON.stringify(removeResponseFailed))).to.be.equal(color.getColor('red', 'Error'));
  });
  it('List Response Test', () => {
    response = JSON.parse(JSON.stringify(listResponseFailed));
    expect(client.printResult(JSON.stringify(listResponseFailed))).to.be.equal(color.getColor('red', 'Error'));
  });
  it('Read Response Test', () => {
    response = JSON.parse(JSON.stringify(readResponseFailed));
    expect(client.printResult(JSON.stringify(readResponseFailed))).to.be.equal(color.getColor('red', 'Error'));
  });
});

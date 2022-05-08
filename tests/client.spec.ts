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

const addUserResponse: ResponseType = {
  type: 'userAdd',
  success: true,
  user: 'prueba',
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

const addUserResponseFailed: ResponseType = {
  type: 'userAdd',
  success: false,
  error: `${color.getColor('red', 'Error')}`,
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

describe('Response Test', () => {
  it('Add User Response Test', () => {
    expect(client.printResult(JSON.stringify(addUserResponse))).to.be.equal(color.getColor('green', `El usuario prueba ha creado su directorio`));
  });
  it('Add Response Test', () => {
    expect(client.printResult(JSON.stringify(addResponse))).to.be.equal(color.getColor('green', `La nota responseTest ha sido creada de forma satisfactoria`));
  });
  it('Modify Response Test', () => {
    expect(client.printResult(JSON.stringify(modifyResponse))).to.be.equal(color.getColor('green', `La nota responseTest ha sido modificada de forma satisfactoria`));
  });
  it('Remove Response Test', () => {
    expect(client.printResult(JSON.stringify(removeResponse))).to.be.equal(color.getColor('green', `La nota responseTest ha sido eliminada de forma satisfactoria`));
  });
  it('List Response Test', () => {
    expect(client.printResult(JSON.stringify(listResponse))).to.be.equal(`${color.getColor('yellow', 'responseTest')}` + '\n');
  });
  it('Read Response Test', () => {
    expect(client.printResult(JSON.stringify(readResponse))).to.be.equal(`Título: ${color.getColor('yellow', 'responseTest')} => Contenido: ${color.getColor('yellow', 'Test')}`);
  });
});

describe('Response Error Test', () => {
  it('Add User Response Test', () => {
    expect(client.printResult(JSON.stringify(addUserResponseFailed))).to.be.equal(color.getColor('red', 'Error'));
  });
  it('Add Response Test', () => {
    expect(client.printResult(JSON.stringify(addResponseFailed))).to.be.equal(color.getColor('red', 'Error'));
  });
  it('Modify Response Test', () => {
    expect(client.printResult(JSON.stringify(modifyResponseFailed))).to.be.equal(color.getColor('red', 'Error'));
  });
  it('Remove Response Test', () => {
    expect(client.printResult(JSON.stringify(removeResponseFailed))).to.be.equal(color.getColor('red', 'Error'));
  });
  it('List Response Test', () => {
    expect(client.printResult(JSON.stringify(listResponseFailed))).to.be.equal(color.getColor('red', 'Error'));
  });
  it('Read Response Test', () => {
    expect(client.printResult(JSON.stringify(readResponseFailed))).to.be.equal(color.getColor('red', 'Error'));
  });
});

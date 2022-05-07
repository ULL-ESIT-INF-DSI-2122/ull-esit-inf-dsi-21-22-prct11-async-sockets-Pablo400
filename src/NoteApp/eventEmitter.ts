/* eslint-disable require-jsdoc */

import {EventEmitter} from 'events';
import {RequestType} from './types';
import * as net from 'net';


export class MyEventEmitter extends EventEmitter {
  constructor(public connection: net.Socket) {
    super();
  }
  public writeData(message: RequestType) {
    this.connection.write(`${JSON.stringify(message)}`);

    let wholeData = '';
    this.connection.on('data', (dataChunk) => {
      wholeData += dataChunk.toString();
      this.emit('message', wholeData);
    });
  }
}

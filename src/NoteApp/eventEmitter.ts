/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

import {EventEmitter} from 'events';
import {RequestType} from './types';
import * as net from 'net';

/**
 * Event Emitter Class
 */
export class MyEventEmitter extends EventEmitter {
  constructor(public connection: net.Socket) {
    super();
  }
  /**
   * Emits and recieves data from the client
   * @param message Request of the client
   */
  public writeData(message: RequestType) {
    this.connection.write(`${JSON.stringify(message)}`);

    let wholeData = '';
    this.connection.on('data', (dataChunk) => {
      wholeData += dataChunk.toString();
      this.emit('response', wholeData);
    });
  }
}

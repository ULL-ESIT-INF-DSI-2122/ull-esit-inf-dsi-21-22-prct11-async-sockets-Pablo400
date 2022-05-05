/* eslint-disable require-jsdoc */

import {EventEmitter} from 'events';

export class MessageEventEmitterClient extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();

    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      this.emit('resquest', JSON.parse(wholeData));
    });
  }
}

/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as net from 'net';
import {MyEventEmitter} from './eventEmitter';
import {ChalkColor} from './NoteOperations/utilities';
import {RequestType} from './types';

/**
 * Client class
 */
export class Client {
  /**
   * Gets the request type json
   * @param request Client request
   */
  constructor(private request: RequestType) {}

  /**
   * Client functions
   */
  client() {
    const json: any = this.request;

    const myEventEmitter = new MyEventEmitter(net.connect({port: 60300}));
    myEventEmitter.writeData(json);

    myEventEmitter.on('response', (data) => {
      console.log(this.printResult(data));
    });
  }

  /**
   * Print the content of the response json
   * @param response Json response on string format
   */
  printResult(response: string) {
    const color = new ChalkColor();
    const titleArray = [];
    const colorArray = [];
    const bodyArray = [];
    const serverResponse = JSON.parse(response);
    let result = '';

    if (serverResponse.success === true) {
      if (serverResponse.notes) {
        for (const note of serverResponse.notes) {
          titleArray.push(note.title);
          colorArray.push(note.color);
          bodyArray.push(note.body);
        }
      }

      if (serverResponse.type === 'userAdd') {
        return color.getColor('green', `El usuario ${serverResponse.user} ha creado su directorio`);
      }

      if (serverResponse.type === 'add') {
        return color.getColor('green', `La nota ${titleArray[0]} ha sido creada de forma satisfactoria`);
      }

      if (serverResponse.type === 'update') {
        return color.getColor('green', `La nota ${titleArray[0]} ha sido modificada de forma satisfactoria`);
      }

      if (serverResponse.type === 'remove') {
        return color.getColor('green', `La nota ${titleArray[0]} ha sido eliminada de forma satisfactoria`);
      }

      if (serverResponse.type === 'read') {
        return `Título: ${color.getColor(`${colorArray}`, `${titleArray}`)} => Contenido: ${color.getColor(`${colorArray}`, `${bodyArray}`)}`;
      }

      if (serverResponse.type === 'list') {
        for (let i = 0; i < titleArray.length; i++) {
          result += `${color.getColor(`${colorArray[i]}`, `${titleArray[i]}`)}` + '\n';
        }
        return result;
      }
    } else if (serverResponse.success === false) {
      if (serverResponse.type === 'userAdd') {
        return serverResponse.error;
      }

      if (serverResponse.type === 'add') {
        return serverResponse.error;
      }

      if (serverResponse.type === 'update') {
        return serverResponse.error;
      }

      if (serverResponse.type === 'remove') {
        return serverResponse.error;
      }

      if (serverResponse.type === 'read') {
        return serverResponse.error;
      }

      if (serverResponse.type === 'list') {
        return serverResponse.error;
      }
    }
  }
}

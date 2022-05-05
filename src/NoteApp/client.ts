/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as net from 'net';
import {ChalkColor} from './NoteOperations/utilities';
import {RequestType} from './types';

export class Client {
  constructor(private request: RequestType) {}

  client() {
    const json: any = this.request;

    const client = net.connect({port: 60300}, () => {
      console.log('Connected to server!');
      client.write(JSON.stringify(json));
      client.end();
    });

    let responseString = '';
    client.on('data', (data) => {
      responseString += data.toString();
    });

    client.on('close', () => {
      this.printResult(responseString);
    });
  }

  printResult(response: string) {
    const color = new ChalkColor();
    const titleArray = [];
    const colorArray = [];
    const bodyArray = [];
    const serverResponse = JSON.parse(response);
    console.log(serverResponse);

    if (serverResponse.success === true) {
      for (const note of serverResponse.notes) {
        titleArray.push(note.title);
        colorArray.push(note.color);
        bodyArray.push(note.body);
      }

      if (serverResponse.type === 'add') {
        console.log(color.getColor('green', `La nota ${serverResponse.notes.title} ha sido creada de forma satisfactoria`));
      }

      if (serverResponse.type === 'update') {
        console.log(color.getColor('green', `La nota ${serverResponse.notes.title} ha sido modificada de forma satisfactoria`));
      }

      if (serverResponse.type === 'remove') {
        console.log(color.getColor('green', `La nota ${serverResponse.notes.title} ha sido eliminada de forma satisfactoria`));
      }

      if (serverResponse.type === 'read') {
        for (let i = 0; i < titleArray.length; i++) {
          console.log(`Título: ${color.getColor(`${colorArray[i]}`, `${titleArray[i]}`)} => Contenido: ${color.getColor(`${colorArray[i]}`, `${bodyArray[i]}`)}`);
        }
      }

      if (serverResponse.type === 'list') {
        for (let i = 0; i < titleArray.length; i++) {
          console.log(color.getColor(`${colorArray[i]}`, `${titleArray[i]}`));
        }
      }
    } else if (serverResponse.success === false) {
      if (serverResponse.type === 'add') {
        console.log(serverResponse.error);
      }

      if (serverResponse.type === 'update') {
        console.log(serverResponse.error);
      }

      if (serverResponse.type === 'remove') {
        console.log(serverResponse.error);
      }

      if (serverResponse.type === 'read') {
        console.log(serverResponse.error);
      }

      if (serverResponse.type === 'list') {
        console.log(serverResponse.error);
      }
    }
  }
}

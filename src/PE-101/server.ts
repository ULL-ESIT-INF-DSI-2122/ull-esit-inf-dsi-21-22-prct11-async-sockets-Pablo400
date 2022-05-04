/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import * as net from 'net';
import {spawn} from 'child_process';

class Server {
  constructor() { }

  server() {
    net.createServer({allowHalfOpen: true}, (connection) => {
      console.log('A client has connected.');

      connection.write('Hello Client');

      let clientData = '';
      connection.on('data', (data) => {
        clientData += data.toString();
      });

      connection.on('end', () => {
        const prueba = JSON.parse(clientData);
        console.log(prueba);
        const command = spawn(`${prueba.command}`, [`${prueba.option}`, `${prueba.fileName}`]);

        let commandOutput = '';
        command.stdout.on('data', (piece) => {
          commandOutput += piece;
        });

        command.stderr.on('error', (err) => {
          console.log(err);
        });

        command.on('close', () => {
          console.log(commandOutput);
        });
        // console.log('A client has disconnected');
      });
    }).listen(60300, () => {
      console.log('Waiting for clients to connect.');
    });
  }
}

const server = new Server();
server.server();

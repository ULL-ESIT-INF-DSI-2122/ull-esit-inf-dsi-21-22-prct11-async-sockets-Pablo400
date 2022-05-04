/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import * as net from 'net';

class Client {
  constructor(private commandArg: string, private options: string, private fileName: string) {}

  client() {
    const json: any = {
      command: this.commandArg as string,
      option: this.options as string,
      filename: this.fileName as string,
    };

    const client = net.connect({port: 60300}, () => {
      console.log('Connected to server!');
      client.write(JSON.stringify(json));
      client.end();
    });

    client.on('data', (data) => {
      console.log(data.toString());
    });
  }
}

const commandArg = process.argv[2];
const options = process.argv[3];
const fileName = process.argv[4];

const client = new Client(commandArg, options, fileName);

client.client();

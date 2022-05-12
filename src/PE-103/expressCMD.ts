/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import express from 'express';
import {spawn} from 'child_process';

const app = express();

app.get('/execmd', (req, res) => {
  let filename = '';
  if (!req.query.filename) {
    filename = './';
  } else {
    filename = req.query.filename as string;
  }

  cmdPromise(req.query.cmd as string, req.query.args as string, filename).then((commandOutput) => {
    const json = {command: req.query.cmd, output: `${commandOutput}`};
    res.send(json);
  }).catch((err) => {
    res.send(err);
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

const cmdPromise = (cmd: string, args: string, filename: string) => {
  return new Promise<string>((resolve, reject) => {
    const command = spawn(cmd, [args, filename]);

    let commandOutput = '';
    command.stdout.on('data', (data: any) => {
      commandOutput = data.toString().split('\n');
    });

    command.stdout.on('close', () => {
      resolve(commandOutput);
    });

    command.on('error', (err) => {
      reject(err);
    });
  });
};


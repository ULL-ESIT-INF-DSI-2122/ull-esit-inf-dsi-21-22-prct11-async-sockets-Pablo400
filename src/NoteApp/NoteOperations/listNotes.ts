/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {listNotesInterface} from './interfaces';

/**
 * Class to List Notes
 */
export class ListNotes extends ChalkColor implements listNotesInterface {
  constructor() {
    super();
  }

  /**
   * This function list all notes on any directory of a user
   * @param user
   * @returns
   */
  listNotes(user: string) {
    const color = new ChalkColor();
    fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, fs.constants.F_OK, (err: Error) => {
      fs.readdir(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, (err: Error, files: any) => {
        if (err) {
          return console.log(color.getColor('red', 'Ese usuario no tiene ninguna nota'));
        }

        files.forEach((file: string) => {
          fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${file}`, (err: Error) => {
            if (err) {
              return console.log(color.getColor('red', 'Ese fichero no existe'));
            }

            const json: any = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${file}`);
            console.log(color.getColor(json.color, json.title));
          });
        });
      });
    });
  }
};

export const listNoteCallback = (user: string, cb: (err: string | undefined, correct: string | undefined) => void) => {
  const color = new ChalkColor();
  fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, fs.constants.F_OK, (err: Error) => {
    if (err) {
      cb(color.getColor('red', 'Ese usuario no existe'), undefined);
    } else {
      fs.readdir(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, (err: Error, files: any) => {
        if (err) {
          cb(color.getColor('red', 'Ese usuario no tiene ninguna nota'), undefined);
        }

        files.forEach((file: string) => {
          fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${file}`, (err: Error) => {
            if (err) {
              cb(color.getColor('red', 'Ese fichero no existe'), undefined);
            }

            const json: any = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${file}`);
            console.log(color.getColor(json.color, json.title));
            cb(undefined, color.getColor(json.color, json.title));
          });
        });
      });
    }
  });
};

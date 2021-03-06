/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {Note, ResponseType} from '../types';

/**
 * Class to List Notes
 */
export class ListNotes extends ChalkColor {
  constructor() {
    super();
  }

  /**
   * This function list all notes on any directory of a user
   * @param user User Name
   * @returns Error or correct response
   */
  listNoteCallback = (user: string, cb: (err: ResponseType | undefined, correct: ResponseType | undefined) => void) => {
    const color = new ChalkColor();
    const notesArray: Note[] = [];
    let response: ResponseType = {
      type: 'add',
      success: false,
    };

    fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, fs.constants.F_OK, (err: Error) => {
      if (err) {
        response = {type: 'list', success: false, error: color.getColor('red', 'Ese usuario no existe')};
        cb(response, undefined);
      } else {
        fs.readdir(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, (err: Error, files: any) => {
          if (err) {
            response = {type: 'list', success: false, error: color.getColor('red', 'No se pudo leer el directorio')};
            cb(response, undefined);
          } else {
            files.forEach((file: string) => {
              const json: any = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${file}`);
              notesArray.push(json);
            });

            if (notesArray.length > 0) {
              response = {
                type: 'list',
                success: true,
                notes: notesArray,
              };

              cb(undefined, response);
            } else {
              response = {type: 'list', success: false, error: color.getColor('red', 'Ese usuario no tiene ninguna nota')};
              cb(response, undefined);
            }
          }
        });
      }
    });
  };
};


/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {ResponseType} from '../types';

/**
 * Class to Read Notes
 */
export class ReadNotes extends ChalkColor {
  constructor() {
    super();
  }

  /**
   * This function reads a note
   * @param user
   * @param title
   * @returns
   */
  readNoteCallback = (user: string, title: string, cb: (err: ResponseType | undefined, correct: ResponseType | undefined) => void) => {
    const color = new ChalkColor();
    let response: ResponseType = {
      type: 'add',
      success: false,
    };

    fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err: Error) => {
      if (err) {
        response = {type: 'read', success: false, error: color.getColor('red', 'Esa nota no existe')};
        cb(response, undefined);
      } else {
        fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err: Error) => {
          if (err) {
            response = {type: 'read', success: false, error: color.getColor('red', 'Ha ocurrido un error inesperado')};
            cb(response, undefined);
          } else {
            const json: any = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`);
            response = {
              type: 'read',
              success: true,
              notes: [json],
            };
            cb(undefined, response);
          }
        });
      }
    });
  };
};


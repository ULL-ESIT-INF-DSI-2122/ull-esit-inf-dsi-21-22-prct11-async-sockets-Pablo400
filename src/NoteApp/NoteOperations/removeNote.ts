/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {ResponseType} from '../types';


/**
 * Class to Remove Notes
 */
export class RemoveNote extends ChalkColor {
  constructor() {
    super();
  }

  /**
   * This function removes a note
   * @param user User name
   * @param title Note title
   * @returns Error or correct response
   */
  removeNoteCallback = (user: string, title: string, cb: (err: ResponseType | undefined, correct: ResponseType | undefined) => void) => {
    const color = new ChalkColor();
    let response: ResponseType = {
      type: 'add',
      success: false,
    };
    fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err: Error) => {
      if (err) {
        response = {type: 'remove', success: false, error: color.getColor('red', 'Esa nota no existe')};
        cb(response, undefined);
      } else {
        const json = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`);
        fs.unlink(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err: Error) => {
          if (err) {
            response = {type: 'remove', success: false, error: color.getColor('red', 'La nota no pudo ser eliminada')};
            cb(response, undefined);
          }
          response = {
            type: 'remove',
            success: true,
            notes: [json],
          };

          cb(undefined, response);
        });
      }
    });
  };
};


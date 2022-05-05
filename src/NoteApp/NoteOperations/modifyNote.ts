/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {ResponseType} from '../types';

/**
 * Class to Modify Notes
 */
export class ModifyNote extends ChalkColor {
  constructor() {
    super();
  }

  /**
   * This function modifies an existing note
   * @param user User name
   * @param title Note title
   * @param body Note body
   * @returns Error or correct response
   */
  modifyNoteCallback = (user: string, title: string, body: string, cb: (err: ResponseType | undefined, correct: ResponseType | undefined) => void) => {
    const color = new ChalkColor();
    let response: ResponseType = {
      type: 'add',
      success: false,
    };
    fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err: Error) => {
      if (err) {
        response = {type: 'update', success: false, error: color.getColor('red', 'Ese usuario no existe')};
        cb(response, undefined);
      } else {
        fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err: Error)=> {
          const json = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`);
          json.body = body;

          fs.writeFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, JSON.stringify(json, null, 2), (err: Error) => {
            if (err) {
              response = {type: 'update', success: false, error: color.getColor('red', 'Ese usuario no existe')};
              cb(response, undefined);
            } else {
              response = {
                type: 'update',
                success: true,
                notes: [json],
              };
              cb(undefined, response);
            }
          });
        });
      }
    });
  };
};



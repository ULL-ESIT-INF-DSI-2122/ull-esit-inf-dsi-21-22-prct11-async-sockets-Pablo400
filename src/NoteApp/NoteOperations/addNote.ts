/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {ResponseType} from '../types';

// /**
//  * Class to Add Notes
//  */
export class AddNote extends ChalkColor {
  constructor() {
    super();
  }

  /**
   * This function adds a note to any user directory
   * @param user
   * @param title
   * @param body
   * @param noteColor
   * @returns
   */
  addNoteCallback = (user: string, title: string, body: string, noteColor: string, cb: (err: ResponseType | undefined, correct: ResponseType | undefined) => void) => {
    const color = new ChalkColor();
    let response: ResponseType = {
      type: 'add',
      success: false,
    };

    if (title != '' && noteColor != '' && body != '' ) {
      if (noteColor === 'red' || noteColor === 'green' || noteColor === 'yellow' || noteColor === 'blue') {
        fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, fs.constants.F_OK, (err: Error) => {
          if (err) {
            response = {type: 'add', success: false, error: color.getColor('red', 'Ese usuario no existe')};
            cb(response, undefined);
          } else {
            // Se comprueba si la nota ya existe
            fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err: Error) => {
              if (err) {
                const json: any = {
                  title: title,
                  body: body,
                  color: noteColor,
                };
                fs.writeFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, JSON.stringify(json, null, 2), (err: Error) => {
                  if (err) {
                    response = {type: 'add', success: false, error: color.getColor('red', 'No se ha podido crear la nota')};
                    cb(response, undefined);
                  } else {
                    response = {
                      type: 'add',
                      success: true,
                      notes: [json],
                    };
                    cb(undefined, response);
                  }
                });
              } else {
                response = {type: 'add', success: false, error: color.getColor('red', 'Esa nota ya existe')};
                cb(response, undefined);
              }
            });
          }
        });
      } else {
        response = {type: 'add', success: false,
          error: color.getColor('red', 'No se puede crear una nota si no se le indican un color, use: red, green, yellow o blue como colores')};
        cb(response, undefined);
      }
    } else {
      response = {type: 'add', success: false, error: color.getColor('red', 'No se puede crear una nota vacía')};
      cb(response, undefined);
    }
  };
};


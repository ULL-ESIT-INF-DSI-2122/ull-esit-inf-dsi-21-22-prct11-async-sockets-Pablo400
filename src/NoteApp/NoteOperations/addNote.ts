/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {addNoteInterface} from './interfaces';


/**
 * Class to Add Notes
 */
export class AddNote extends ChalkColor implements addNoteInterface {
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
  addNote(user: string, title: string, body: string, noteColor: string) {
    const color = new ChalkColor();

    fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, fs.constants.F_OK, (err: Error) => {
      if (err) {
        return console.log(color.getColor('red', 'Ese usuario no existe'));
      }

      const json: any = {
        title: title,
        body: body,
        color: noteColor,
      };

      if (title != '' && noteColor != '' && body != '' ) {
        if (noteColor === 'red' || noteColor === 'green' || noteColor === 'yellow' || noteColor === 'blue') {
          // Se comprueba si la nota ya existe
          fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err: Error) => {
            if (err) {
              fs.writeFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, JSON.stringify(json, null, 2), (err: Error) => {
                if (err) {
                  return console.log(color.getColor('red', 'No se ha podido crear la nota'));
                }

                return console.log(color.getColor('green', 'La nota se ha creado de forma satisfactoria'));
              });
            } else {
              return console.log(color.getColor('red', 'Esa nota ya existe'));
            }
          });
        } else {
          return console.log(color.getColor('red', 'No se puede crear una nota si no se le indican un color, use: red, green, yellow o blue como colores'));
        }
      } else {
        return console.log(color.getColor('red', 'No se puede crear una nota vacía'));
      }
    });
  }
};

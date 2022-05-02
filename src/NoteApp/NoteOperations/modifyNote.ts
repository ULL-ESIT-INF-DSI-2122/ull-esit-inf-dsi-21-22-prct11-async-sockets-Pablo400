/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {modifyNoteInterface} from './interfaces';

/**
 * Class to Modify Notes
 */
export class ModifyNote extends ChalkColor implements modifyNoteInterface {
  constructor() {
    super();
  }

  /**
   * This function modifies an existing note
   * @param user
   * @param title
   * @param body
   * @returns
   */
  modifyNote(user: string, title: string, body: string) {
    const color = new ChalkColor();
    fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err: Error) => {
      if (err) {
        return console.log(color.getColor('red', 'Ha ocurrido un error inesperado'));
      }

      fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err: Error)=> {
        const json = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`);
        json.body = body;

        fs.writeFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, JSON.stringify(json, null, 2), (err: Error) => {
          if (err) {
            return console.log(color.getColor('red', 'No se ha podido modificar la nota'));
          }

          return console.log(color.getColor('green', 'La nota se ha modificado de forma satisfactoria'));
        });
      });
    });
  }
};

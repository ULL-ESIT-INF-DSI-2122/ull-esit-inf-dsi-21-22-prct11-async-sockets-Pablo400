/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {readNoteInterface} from './interfaces';

/**
 * Class to Read Notes
 */
export class ReadNotes extends ChalkColor implements readNoteInterface {
  constructor() {
    super();
  }

  /**
   * This function reads a note
   * @param user
   * @param title
   * @returns
   */
  readNote(user: string, title: string) {
    const color = new ChalkColor();
    fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err: Error) => {
      if (err) {
        console.log(color.getColor('red', 'Esa nota no existe'));
      }

      fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err: Error) => {
        if (err) {
          console.log(color.getColor('red', 'Ha ocurrido un error inesperado'));
        }

        const json: any = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`);
        console.log(color.getColor(json.color, json.title));
        console.log(color.getColor(json.color, json.body));
      });
    });
  }
};

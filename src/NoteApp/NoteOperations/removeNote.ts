/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {removeNoteInterface} from './interfaces';

/**
 * Class to Remove Notes
 */
export class RemoveNote extends ChalkColor implements removeNoteInterface {
  constructor() {
    super();
  }

  /**
   * This function removes a note
   * @param user
   * @param title
   * @returns
   */
  removeNote(user: string, title: string) {
    const color = new ChalkColor();
    fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err: Error) => {
      if (err) {
        return console.log(color.getColor('red', 'Esa nota no existe'));
      }

      fs.unlink(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err: Error) => {
        if (err) {
          return console.log(color.getColor('red', 'La nota no pudo ser eliminada'));
        }

        return console.log(color.getColor('green', 'Nota eliminada'));
      });
    });
  }
};

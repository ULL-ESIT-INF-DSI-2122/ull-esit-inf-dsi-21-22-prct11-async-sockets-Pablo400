/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';


/**
 * Class to Remove Notes
 */
export class RemoveNote extends ChalkColor {
  constructor() {
    super();
  }

  /**
   * This function removes a note
   * @param user
   * @param title
   * @returns
   */
  removeNoteCallback = (user: string, title: string, cb: (err: string | undefined, correct: string | undefined) => void) => {
    const color = new ChalkColor();
    fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err: Error) => {
      if (err) {
        cb(color.getColor('red', 'Esa nota no existe'), undefined);
      } else {
        fs.unlink(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err: Error) => {
          if (err) {
            cb(color.getColor('red', 'La nota no pudo ser eliminada'), undefined);
          }

          cb(undefined, color.getColor('green', 'Nota eliminada'));
        });
      }
    });
  };
};


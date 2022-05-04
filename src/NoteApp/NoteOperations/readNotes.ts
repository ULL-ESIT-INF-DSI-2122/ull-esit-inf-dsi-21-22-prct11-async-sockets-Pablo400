/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';


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
  readNoteCallback = (user: string, title: string, cb: (err: string | undefined, correct: string | undefined) => void) => {
    const color = new ChalkColor();
    fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err: Error) => {
      if (err) {
        cb(color.getColor('red', 'Esa nota no existe'), undefined);
      } else {
        fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err: Error) => {
          if (err) {
            cb(color.getColor('red', 'Ha ocurrido un error inesperado'), undefined);
          } else {
            const json: any = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`);
            cb(undefined, `Título: ${color.getColor(json.color, json.title)} => Contenido: ${color.getColor(json.color, json.body)}`);
          }
        });
      }
    });
  };
};


/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {addUserDirectoryInterface} from './interfaces';

/**
 * Class to Add Users to the Directory
 */
export class AddUserDirectory extends ChalkColor implements addUserDirectoryInterface {
  constructor() {
    super();
  }

  /**
   * This function adds a new directory to any user found on a json file
   * @param user
   * @returns
   */
  addUserDirectory(username: string) {
    const color = new ChalkColor();
    let createDir: boolean = false;

    fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/src/NoteApp/users.json`, (err: Error) => {
      if (err) {
        return console.log(color.getColor('red', 'El fichero users.json no existe'));
      }

      const json = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/src/NoteApp/users.json`);

      // Comprobar si existe el usuario mirando en el fichero users.json que es una pequeña base de datos con los usuarios del sistema
      // y creamos su fichero correspondiente
      for (const user of json) {
        if (username === user.username) {
          createDir = true;
          break;
        }
      }

      if (createDir === true) {
        fs.mkdir(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${username}`, (err: Error) => {
          if (err) {
            return console.log(color.getColor('red', 'Ese directorio ya existe'));
          }
          return console.log(color.getColor('green', 'Directorio del usuario creado'));
        });
      } else {
        return console.log(color.getColor('red', 'Ese usuario no existe'));
      }
    });
  }
};

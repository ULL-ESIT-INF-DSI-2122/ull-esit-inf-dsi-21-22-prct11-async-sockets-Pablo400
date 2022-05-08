/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');

import {ChalkColor} from './utilities';
import {ResponseType} from '../types';

/**
 * Class to Add Users to the Data Base
 */
export class AddUser extends ChalkColor {
  constructor() {
    super();
  }

  /**
   * This function adds a new directory to any user found on a json file
   */
  addUserCallback = (user: string, cb: (err: ResponseType | undefined, correct: ResponseType | undefined) => void) => {
    const color = new ChalkColor();
    let response: ResponseType = {
      type: 'add',
      success: false,
    };

    if (user === '') {
      response = {type: 'userAdd', success: false, error: color.getColor('red', 'No ha incluido ningún nombre de usuario')};
      cb(response, undefined);
    } else {
      fs.mkdir(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, (err: Error) => {
        if (err) {
          response = {type: 'userAdd', success: false, error: color.getColor('red', 'Ese usuario ya existe')};
          cb(response, undefined);
        } else {
          response = {
            type: 'userAdd',
            success: true,
            user: `${user}`,
          };
          cb(undefined, response);
        }
      });
    }
  };
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveNote = void 0;
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');
const utilities_1 = require("./utilities");
/**
 * Class to Remove Notes
 */
class RemoveNote extends utilities_1.ChalkColor {
    constructor() {
        super();
    }
    /**
     * This function removes a note
     * @param user
     * @param title
     * @returns
     */
    removeNote(user, title) {
        const color = new utilities_1.ChalkColor();
        fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err) => {
            if (err) {
                return console.log(color.getColor('red', 'Esa nota no existe'));
            }
            fs.unlink(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err) => {
                if (err) {
                    return console.log(color.getColor('red', 'La nota no pudo ser eliminada'));
                }
                return console.log(color.getColor('green', 'Nota eliminada'));
            });
        });
    }
}
exports.RemoveNote = RemoveNote;
;

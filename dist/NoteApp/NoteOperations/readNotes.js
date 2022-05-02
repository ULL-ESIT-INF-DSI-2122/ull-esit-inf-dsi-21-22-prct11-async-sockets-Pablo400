"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadNotes = void 0;
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');
const utilities_1 = require("./utilities");
/**
 * Class to Read Notes
 */
class ReadNotes extends utilities_1.ChalkColor {
    constructor() {
        super();
    }
    /**
     * This function reads a note
     * @param user
     * @param title
     * @returns
     */
    readNote(user, title) {
        const color = new utilities_1.ChalkColor();
        fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err) => {
            if (err) {
                console.log(color.getColor('red', 'Esa nota no existe'));
            }
            fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err) => {
                if (err) {
                    console.log(color.getColor('red', 'Ha ocurrido un error inesperado'));
                }
                const json = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`);
                console.log(color.getColor(json.color, json.title));
                console.log(color.getColor(json.color, json.body));
            });
        });
    }
}
exports.ReadNotes = ReadNotes;
;

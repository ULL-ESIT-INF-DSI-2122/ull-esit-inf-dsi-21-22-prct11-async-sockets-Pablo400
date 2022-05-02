"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyNote = void 0;
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');
const utilities_1 = require("./utilities");
/**
 * Class to Modify Notes
 */
class ModifyNote extends utilities_1.ChalkColor {
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
    modifyNote(user, title, body) {
        const color = new utilities_1.ChalkColor();
        fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err) => {
            if (err) {
                return console.log(color.getColor('red', 'Ha ocurrido un error inesperado'));
            }
            fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, (err) => {
                const json = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`);
                json.body = body;
                fs.writeFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, JSON.stringify(json, null, 2), (err) => {
                    if (err) {
                        return console.log(color.getColor('red', 'No se ha podido modificar la nota'));
                    }
                    return console.log(color.getColor('green', 'La nota se ha modificado de forma satisfactoria'));
                });
            });
        });
    }
}
exports.ModifyNote = ModifyNote;
;

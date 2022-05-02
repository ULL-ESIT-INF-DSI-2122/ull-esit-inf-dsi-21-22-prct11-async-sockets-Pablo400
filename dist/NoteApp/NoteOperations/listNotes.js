"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNotes = void 0;
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');
const utilities_1 = require("./utilities");
/**
 * Class to List Notes
 */
class ListNotes extends utilities_1.ChalkColor {
    constructor() {
        super();
    }
    /**
     * This function list all notes on any directory of a user
     * @param user
     * @returns
     */
    listNotes(user) {
        const color = new utilities_1.ChalkColor();
        fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, fs.constants.F_OK, (err) => {
            fs.readdir(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, (err, files) => {
                if (err) {
                    return console.log(color.getColor('red', 'Ese usuario no tiene ninguna nota'));
                }
                files.forEach((file) => {
                    try {
                        fs.readFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${file}`, (err) => {
                            if (err) {
                                return console.log(color.getColor('red', 'Ese fichero no existe'));
                            }
                            const json = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${file}`);
                            console.log(color.getColor(json.color, json.title));
                        });
                    }
                    catch (err) {
                        return console.log(color.getColor('red', 'Ese fichero no existe'));
                    }
                });
            });
        });
    }
}
exports.ListNotes = ListNotes;
;

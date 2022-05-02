"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNote = void 0;
/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const fs = require('fs');
const utilities_1 = require("./utilities");
/**
 * Class to Add Notes
 */
class AddNote extends utilities_1.ChalkColor {
    constructor() {
        super();
    }
    /**
     * This function adds a note to any user directory
     * @param user
     * @param title
     * @param body
     * @param noteColor
     * @returns
     */
    addNote(user, title, body, noteColor) {
        const color = new utilities_1.ChalkColor();
        fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}`, fs.constants.F_OK, (err) => {
            if (err) {
                return console.log(color.getColor('red', 'Ese usuario no existe'));
            }
            const json = {
                title: title,
                body: body,
                color: noteColor,
            };
            if (title != '' && noteColor != '' && body != '') {
                if (noteColor === 'red' || noteColor === 'green' || noteColor === 'yellow' || noteColor === 'blue') {
                    // Se comprueba si la nota ya existe
                    fs.access(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, fs.constants.F_OK, (err) => {
                        if (err) {
                            fs.writeFile(`/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-Pablo400/ProgramFiles/${user}/${title}.json`, JSON.stringify(json, null, 2), (err) => {
                                if (err) {
                                    return console.log(color.getColor('red', 'No se ha podido crear la nota'));
                                }
                                return console.log(color.getColor('green', 'La nota se ha creado de forma satisfactoria'));
                            });
                        }
                        else {
                            return console.log(color.getColor('red', 'Esa nota ya existe'));
                        }
                    });
                }
                else {
                    return console.log(color.getColor('red', 'No se puede crear una nota si no se le indican un color, use: red, green, yellow o blue como colores'));
                }
            }
            else {
                return console.log(color.getColor('red', 'No se puede crear una nota vacía'));
            }
        });
    }
}
exports.AddNote = AddNote;
;

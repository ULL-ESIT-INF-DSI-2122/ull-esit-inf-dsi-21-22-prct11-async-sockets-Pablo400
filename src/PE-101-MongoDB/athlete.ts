/* eslint-disable max-len */
import {Document, Schema, model} from 'mongoose';
const validator = require('validator');

interface AthleteInterface extends Document {
  name: string,
  surname:string
  DNI: string,
  age: number,
  sport: string,
  expertSport: string,
  personalBest: string,
}

const AthleteSchema = new Schema<AthleteInterface>({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Your name must start with a capital letter');
      } else if (!validator.isAlpha(value)) {
        throw new Error('Your name must contain alphabet characters');
      }
    },
  },
  surname: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Your surname must start with a capital letter');
      }
    },
  },
  DNI: {
    type: String,
    required: true,
    unique: true,
    validate: (value: string) => {
      if (value.length !== 9) {
        throw new Error('Your DNI must constain 9 characters');
      }
    },
  },
  age: {
    type: Number,
    required: true,
    validate: (value: number) => {
      if (value <= 15) {
        throw new Error('You must have more than 15 years to be a deportist');
      }
    },
  },
  sport: {
    type: String,
    required: true,
    enum: ['Atletismo', 'Ciclismo', 'Natación', 'Marcha Atlética', 'Salto', 'Lanzamiento'],
  },
  expertSport: {
    type: String,
    required: true,
    enum: ['Atletismo', 'Ciclismo', 'Natación', 'Marcha Atlética', 'Salto', 'Lanzamiento'],
  },
  personalBest: {
    type: String,
    required: true,
    validate: (value: string) => {
      const pattern = /((([0-5]?[0-9]):(?:[012345]))\d)$/g;
      const pattern2= /(([0-9]*) metros)$/g;
      const result = value.match(pattern)?.toString() || value.match(pattern2)?.toString();
      if (result === undefined) {
        throw new Error('Format not valid, try again with this format -> MM:SS or MM metros');
      }
    },
  },
});

export const Athlete = model<AthleteInterface>('Athlete', AthleteSchema);

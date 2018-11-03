import { UsefulStuff } from '../library';

const persons = require('../.data/persons.json');
const objects = require('../.data/objects.json');

export class GenerateBelovedObjects {
  public static generate(): Array<any> {
    for (let i: number = 0; i <= objects.length - 1; i++) {
      const index: number = UsefulStuff.randomInteger(0, persons.length - 1);
      objects[i].personId = persons[index].id;
    }
    return objects;
  }
}
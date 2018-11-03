import * as fs from 'fs';
import * as path from 'path';
import { GenerateBelovedObjects } from "./generate-beloved-objects";


console.log(GenerateBelovedObjects.generate());

function generateObjectsJSON() {
  const fileURL: string = path.resolve(__dirname, `./.data/generated-data/objects-with-proprietor.json`);
  fs.writeFileSync(fileURL, JSON.stringify(GenerateBelovedObjects.generate(), null, 2));
}

generateObjectsJSON();
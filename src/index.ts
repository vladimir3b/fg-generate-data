import * as fs from 'fs';
import * as path from 'path';
import { ICompany, Company } from './generate-company/index';
import { RandomPhoneModel, IPhone } from './generate-phones/index';
import { IInvoice } from './generate-invoice';
import { UsefulStuff } from './library/index';
import { RandomInvoice } from './generate-invoice/index';
import { Person, IPerson } from './generate-person/index';



function generateObjectsJSON<T>(fileName: string, numberOfObjects: number, callback: () => Array<T>) {

    const fileURL: string = path.resolve(__dirname, `./.data/generated-data/${fileName}.json`);
    let realNumberOfObjects: number = 0;

    if (!fs.existsSync(fileURL)) {
        const companies: Array<T> = [];
        for (let i: number = 1; i <= numberOfObjects; i++) {
            
            callback().forEach((element: T): void => {
                realNumberOfObjects++;
                companies.push(element);
            })
            
        }
        fs.writeFileSync(fileURL, JSON.stringify(companies, null, 4));
        console.log(`File ${fileName}.json was created. There are ${realNumberOfObjects} records.`);
    } else {
        console.warn(`File ${fileURL} already exists.`);
    }

}


generateObjectsJSON('companies', 1750, (): Array<ICompany> => {
    return [new Company()];
});
generateObjectsJSON('fg-phone-mag', 1, (): Array<ICompany> => {
    return [new Company()];
});

generateObjectsJSON('phones', 358, (): Array<IPhone> => {
    return RandomPhoneModel.createPhones();
});

generateObjectsJSON('people', 4000, (): Array<IPerson> => {
    return [new Person()];
});

// Run this after you run all above
generateObjectsJSON('invoices', 25000, (): Array<IInvoice> => {
    return [RandomInvoice.createInvoice()];
});


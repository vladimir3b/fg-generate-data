import { UsefulStuff as US} from '../library';
import { ICompany, Company } from '../generate-company/index';
import { IPerson, Person } from '../generate-person/index';
import { IPhone, RandomPhoneModel } from '../generate-phones/index';
import * as moment from 'moment';


const companies: Array<ICompany> = require('../.data/generated-data/companies.json');
const phones: Array<IPhone> = require('../.data/generated-data/phones.json');
const people: Array<IPerson> = require('../.data/generated-data/people.json');
const fgPhoneMag: ICompany = require('../.data/generated-data/fg-phone-mag.json')[0];

interface IProduct<T> {
    product: T,
    price: number;
}

interface IInvoice {
    invoiceNumber: string;
    date: string;
    seller: ICompany;
    buyer: ICompany | IPerson;
    products: Array<IProduct<IPhone>>;
}

class RandomInvoice {
    public static createInvoice(): IInvoice {
        const buyer: ICompany | IPerson = (!US.chance(5)) ? US.valueFromArray(companies) : US.valueFromArray(people);   
        const seller: ICompany = fgPhoneMag;
        const numberOfProducts = US.randomInteger(1, 10);
        const products:  Array<IProduct<IPhone>> = [];
        for (let i: number = 1; i <= numberOfProducts; i++) {
            const phone: IPhone = US.valueFromArray(phones);
            products.push({
                product: phone,
                price: US.truncateReal(phone.factoryPrice * US.randomReal(0.90, 1.10))
            });
        }       
        const invoiceNumber: string = US.randExp(/^([A-Z0-9]{8})$/);
        const date: string = moment(US.randomInteger(1483221600000, 1518307222765)).format();    
        return {
            buyer: buyer,
            seller: seller,
            date: date,
            invoiceNumber: invoiceNumber,
            products: products
        }
    }
}

export {
    IInvoice,
    RandomInvoice
}
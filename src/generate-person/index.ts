import { latinStuff } from '../.data/latin';
import { UsefulStuff as US } from '../library/index';
import { humanNames } from '../.data/name';
import { IAddress, Address } from '../generate-address/index';
import { countries, ICountry } from '../.data/country';
import * as moment from 'moment';

type gender = 'male' | 'female';
interface IPerson {
     
    upid: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    sex: gender;
    email: string;
    company: string;
    address: IAddress;
    telephone: string;
}

class Person implements IPerson {

    public upid: string;
    public firstName: string;
    public lastName: string;
    public birthDate: string;
    public sex: gender;
    public email: string;
    public company: string;
    public address: IAddress;
    public telephone: string;
    
    private _verify<T>(propertyName: string, value: T): T {
        // this will be implemented later
        return value;
    }
    public constructor(
        firstName?: string, 
        lastName?: string, 
        birthDate?: string,
        sex?: gender,
        email?: string,
        company?: string,
        address?: IAddress,
        telephone?: string
    ) {
         // initialize values
        birthDate = (birthDate) ? birthDate : moment(US.randomInteger(-1262304000000, 946684800000)).format('YYYY-MM-DD');        
        sex = (sex) ? sex : US.chance(3) ? 'male' : 'female';
        const upid: string = ((sex === 'male') ? '1' : '0') + birthDate.replace(/-/g, '') + US.randExp(/^([0-9]{7})$/);
        firstName = (firstName) ?  
            firstName : (sex === 'male') ? 
            US.valueFromArray(humanNames.male) : US.valueFromArray(humanNames.female);
        lastName = (lastName) ? lastName : US.valueFromArray(humanNames.surname);
        company = (company) ? company : US.toProperCase(US.valueFromArray(latinStuff.words));
        email = (email) ? email : firstName.toLowerCase() + 
            US.valueFormArrayByPercentage(['.', '_', '-', ''], [20, 20, 5, 55]) +
            lastName.toLowerCase() + '@' + company.toLowerCase() + '.' +
            US.valueFormArrayByPercentage(['com', 'org', 'uk.com', 'ro', 'fr', 'es', 'pt', 'net'], [60, 10, 5, 1, 2, 2, 2, 18]);       
        address = (address) ? address : new Address();
        const chosenCountry: ICountry | undefined =  countries.find((country: ICountry): boolean => {
            if (address) {
                return address.country === country.name;
            }
            return false;
        })
        let dialCode: string = '';
        if (chosenCountry) {
            dialCode = chosenCountry.dialCode;
        } else {
            throw new Error(`There is no country with name ${address.country}.`);
        }    
        telephone = (telephone) ? telephone : `(${dialCode})${US.randExp(/^([0-9]{2}([.][0-9]{3}){1,2})$/)}`;
        // set values to the properties
        this.sex = this._verify('sex', sex);
        this.firstName = this._verify('firstName', firstName);
        this.lastName = this._verify('lastName', lastName);
        this.email = this._verify('email', email);
        this.company = this._verify('company', company);
        this.address =  this._verify('address', address);
        this.telephone = this._verify('telephone', telephone);
        this.upid = upid;
        this.birthDate = birthDate;
    }
}

export {
    Person,
    IPerson
}
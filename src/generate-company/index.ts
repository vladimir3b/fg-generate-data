import { latinStuff } from '../.data/latin';
import { UsefulStuff as US } from '../library/index';
import { IAddress, Address } from '../generate-address/index';
import { countries, ICountry } from '../.data/country';
import { IPerson, Person } from '../generate-person/index';

interface ICompany { 
    uid: string;
    email: string;
    companyName: string;
    address: IAddress;
    telephone: string;
    webSite: string;
    representative?: IPerson;
}

class Company implements ICompany {

    public uid: string;
    public companyName: string;
    public email: string;   
    public address: IAddress;
    public telephone: string;
    public webSite: string
    public representative: IPerson;
    
    private _verify<T>(propertyName: string, value: T): T {
        // this will be implemented later
        return value;
    }
    public constructor(
        companyName?: string,
        email?: string,        
        address?: IAddress,
        telephone?: string,
        webSite?: string,
        representative?: IPerson
    ) {
         // initialize values
     
        const uid: string = US.randExp(/^([A-Z0-9]{15})$/) + (new Date).getTime().toString();
        companyName = (companyName) ? companyName : US.toProperCase(US.valueFromArray(latinStuff.words));
        const domainPrefix: string = US.valueFormArrayByPercentage(['com', 'org', 'uk.com', 'ro', 'fr', 'es', 'pt', 'net'], [60, 10, 5, 1, 2, 2, 2, 18]);      
        const suffix: string = US.valueFromList('office', 'contact', 'contact-us', 'admin', 'manager');
        address = (address) ? address : new Address();
        email = (email) ? email : `${suffix}@${companyName.toLowerCase()}.${domainPrefix}`// 'contact' + '@' + companyName.toLowerCase() + '.' + domain;
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
        webSite = (webSite) ? webSite : `http://${ (US.chance()) ? '' : 'www.'}${companyName.toLowerCase()}.${domainPrefix}`;
        const representativeAddress: IAddress = new Address(address.country)
        if (!representative) {
            representative = new Person(undefined, undefined, undefined, undefined, undefined, companyName, representativeAddress);
        }
        // set values to the properties
        this.companyName = this._verify('companyName', companyName);
        this.email = this._verify('email', email);        
        this.address =  this._verify('address', address);
        this.telephone = this._verify('telephone', telephone);
        this.webSite = webSite;
        this.representative = representative;
        this.uid = uid;
    }
}

export {
    Company,
    ICompany
}
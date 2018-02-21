import { UsefulStuff as US} from '../library';
import { countries, ICountry } from '../.data/country';
import { latinStuff } from '../.data/latin';

const RandExp: any = require('randexp');

interface IStreet {
    name: string;
    number: string;
}
interface IAddress {
    country: string;
    city: string;
    street: IStreet;
}
class Address implements IAddress {
    public country: string;
    public city: string;
    public street: IStreet;
    private _verify<T>(propertyName: string, value: T): T {
        // this will be implemented later
        return value;
    }
    private _returnCity(countryName: string): string {
        const findCountry: ICountry | undefined = countries.find((country: ICountry): boolean => {
            return country.name === countryName;
        });
        if (!findCountry) {
            throw new Error(`There is no country with name ${countryName}.`)
        } else {
            return US.valueFromArray(findCountry.cities);
        }         
    }
    public constructor(country?: string, city?: string, street?: IStreet) {
        // initialize values
        const chosenCounty: ICountry = US.valueFromArray(countries);
        country = (country) ? country : chosenCounty.name;        
        const chosenCity: string = this._returnCity(country);
        city = (city) ? city : chosenCity;
        street = (street) ? street : {
            name: US.toProperCase(US.valueFromArray(latinStuff.words)),
            number: US.randExp(/^([a-zA-Z]{0,1}[1-9]{1}[0-9]{0,3}[a-zA-Z]{0,1})$/)
        };
        // set values to properties
        this.country = this._verify('country', country);
        this.city = this._verify('city', city);
        this.street = this._verify('street', street);
    };
}
export {
    IAddress,
    IStreet,
    Address
}
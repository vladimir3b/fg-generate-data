import {} from 'jasmine';
import { countries, ICountry } from '../.data/country';
import { IAddress, Address } from './index';

describe('testing generate address', () => {
    function showPerson(): void {
        console.log('\nGenerated address:');
        console.log('=================================================='); 
        console.log(`street name: ${address.street.name}`);
        console.log(`street number: ${address.street.number}`);
        console.log(`city: ${address.city}`);
        console.log(`country: ${address.country}`);
        console.log('\n');
    }
    let addressCountry: ICountry | undefined;
    let address: IAddress;
    beforeAll(() => {
        console.log('\nTesting generate address...');
    });
    afterAll(() => {
        showPerson();
    });
    beforeEach(() => {
        address = new Address();
        addressCountry = countries.find((country: ICountry): boolean => {
            return country.name === address.country
        })
    });
    it('country', () => {
        expect(addressCountry).toBeTruthy();
    });
    it('city', () => {
        if (addressCountry) {
            expect(addressCountry.cities.find((city: string): boolean => {
                return city === address.city;
            }));
        }        
    });
    it('street', () => {
        expect(address.street.name).toMatch(/^([A-Z]{1}[a-z]{1,50})$/);
        expect(address.street.number).toMatch(/^([a-zA-Z]{0,1}[1-9]{1}[0-9]{0,3}[a-zA-Z]{0,1})$/);
    });
});


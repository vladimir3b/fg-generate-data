import {} from 'jasmine';
import { Person, IPerson } from './index';

describe('Generate a person with', () => {
    function showPerson(): void {
        console.log('\nGenerated person:');
        console.log('==================================================');
        console.log(`first name: ${person.firstName}`);
        console.log(`last name: ${person.lastName}`);
        console.log(`sex: ${person.sex}`);
        console.log(`email: ${person.email}`);
        console.log(`company: ${person.company}`);
        console.log(`telephone: ${person.telephone}`)
        console.log('address:')
        console.log(`street name: ${person.address.street.name}`);
        console.log(`street number: ${person.address.street.number}`);
        console.log(`city: ${person.address.city}`);
        console.log(`country: ${person.address.country}`);
        console.log('\n');
    }
    beforeAll(() => {console.log('\nTesting generating a person:')});
    afterAll(() => {showPerson()});
    let person: IPerson;
    beforeEach(() => {
        person = new Person();
    });
    it('first name', () => {
        expect(person.firstName).toMatch(/^([A-Z]{1}[a-z]{1,50})$/);
    }); 
    it('sex', () => {
        expect(['male', 'female']).toContain(person.sex);
    });
    it('last name', () => {
        expect(person.lastName).toMatch(/^([A-Z]{1}[a-z]{1,50})$/);
    });
    for (let i: number = 0; i <= 100; i++) {
        it('email', () => {
            expect(person.email).toMatch(/^(([a-z]{1,50}((.|-|_)[a-z]{1,50}[0-9]{0,4}){0,1})[@][a-z]{2,20}([.][a-z]{2,5}){1,3})$/);
        });
    }
    it('company', () => {
       expect(person.company).toMatch(/^((([0-9A-Z]{1}[a-z]{1,50}){1})([ ][0-9A-Z]{1}[a-z]{1,50}){0,4})$/);
    });
});
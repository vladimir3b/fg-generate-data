import {} from 'jasmine';
import { Company, ICompany } from './index';

describe('Generate a company with', () => {
    let company: ICompany;
    function showCompany(): void {
        console.log('\nGenerated company:');
        console.log('==================================================');    
        console.log(`company name: ${company.companyName}`);  
        console.log(`email: ${company.email}`);       
        console.log(`website: ${company.webSite}`);    
        console.log(`telephone: ${company.telephone}`)
        console.log('address:')
        console.log(`street name: ${company.address.street.name}`);
        console.log(`street number: ${company.address.street.number}`);
        console.log(`city: ${company.address.city}`);
        console.log(`country: ${company.address.country}`);
        console.log('\n');
    }
    beforeAll(() => {
        console.log('\nTesting generating a company:');
        company = new Company();
    });
    afterAll(() => {showCompany()});
    it('dumb test', () => {
        expect(true).toBeTruthy();
    });

});
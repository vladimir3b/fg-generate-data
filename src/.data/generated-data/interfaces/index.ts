type gender = 'male' | 'female';

interface IStreet {
    name: string;
    number: string;
}
interface IAddress {
    country: string;
    city: string;
    street: IStreet;
}
interface ICompany { 
    email: string;
    companyName: string;
    address: IAddress;
    telephone: string;
    webSite: string;
    representative: IPerson;
}

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

interface IPerson {
    firstName: string;
    lastName: string;
    sex: gender;
    email: string;
    company: string;
    address: IAddress;
    telephone: string;
}

interface IPhone {
    brand: string;
    modelCode: string;
    phonesCharacteristics: {
        network: string;
        screen: {
            resolution: string;
            size: string;
        }
        platform: {
            os: string;
            chipset: string;
            cpu: string;
            gpu: string;
        }
        memory: {
            cardSlot: boolean;
            ram: string;
            rom: string;
        }
        camera: {
            primary: string;
            secondary: string;            
        }
        battery: string;
    }
    factoryPrice: number;
    color: string;
}

export {
    IAddress,
    ICompany,
    IInvoice,
    IPerson,
    IPhone,
    gender
}
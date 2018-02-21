import { UsefulStuff as US } from '../library/index';
import { phoneConstants } from '../.data/phone';

const phoneBrands: Array<string> = phoneConstants.phoneBrands;
const phoneColors: Array<string> = phoneConstants.phoneColors;

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

class RandomPhoneModel {
 
    public static createPhones(): Array<IPhone> {
        const phones: Array<IPhone> = [];
        let resolution: string, ram: string, rom: string; 
        let cpu: string, gpu: string, price: number;
        let primary: string, secondary: string, battery: string;
        const typeOfPhone: string = US.valueFromList('high-end', 'middle-range', 'low-end');
        const brand: string = US.valueFromArray(phoneBrands);
        const chipset: string = (brand === 'Apple') ?
            US.randExp(/Apple (A[7-9]|A1[0-2]) Bionic/) :
            US.randExp(US.valueFromArray([
                /Exynos [6-8][0-9]{3,3} (quad|hexa|octa)/,
                /Qualcomm ([M-R]{2,3}[6-8][0-9]{1,3}){0,1} Snapdragon [6-9][0-9][0-9]/,
                /Mediatek [G-R]{1,2}[4-7][0-9][0-9][0-9]/,
                /Intel Atom [T-Z][3-7][0-9][0-9]([a-z]|[A-Z])/,
                /Nvidia Tegra [2-5]/
            ]));

        switch (chipset.split(' ')[0]) {
            case 'Apple':
                gpu = 'Apple GPU';
                break;
            case 'Qualcomm':
                gpu = US.randExp(/Qualcomm Adreno [3-7][0-9][0-9]/);
                break;
            case 'Exynos':
                gpu = US.randExp(/ARM Mali-[G-L][3-7][0-9] ([G-R][G-R]{0,1}[2-4][0-9]){0,1}/);
                break;
            case 'Nvidia':
                gpu = US.randExp(/Nvidia Tegra [K-N][1-5]/);
                break;
            default:
                gpu = US.randExp(US.valueFromArray([
                    /ARM Mali-[G-L][3-7][0-9] ([G-R][G-R]{0,1}[2-4][0-9]){0,1}/,
                    /PowerVR [G-T]{0,2}[3-7][T-X]{0,2}/,
                    /Nvidia Tegra [K-N][1-5]/
                ]));
        }
        switch (typeOfPhone) {
            case 'low-end':
                resolution = US.valueFromArray([
                    '720 x 1280',
                    '540 x 960',
                    '480 x 800',
                    '480 x 854'
                ]);
                ram = US.randExp(/(1|2) GB/);
                rom = US.randExp(/(4|8|16) GB/);
                cpu = US.randExp(US.valueFromArray([
                    /quad-core \(4x1\.[2-9][0-9] GHz\)/,      
                    /dual-core \(2x1\.[5-9][0-9] GHz\)/
                ]));
                price = US.randomInteger(150, 200);
                primary = US.randExp(/(3\.5|5) MP/);
                secondary = US.randExp(/(0\.3|1\.33|2|3\.5) MP/);
                battery = US.randExp(/(1[5-9]|2[0-3])00 mAh/);
                break;
            case 'middle-range':
                resolution = US.valueFromArray([
                    '1080 x 2220',
                    '1080 x 1920',
                    '1080 x 1920',
                    '720 x 1280'
                ]);
                ram = US.randExp(/(2|3) GB/);
                rom = US.randExp(/(16|32) GB/);
                cpu = US.randExp(US.valueFromArray([
                    /hexa-core \(4x1\.[0-5][0-9] GHz, 2x[1-2]\.[0-4][0-9] GHz \)/,
                    /quad-core \(4x[1-2]\.[0-9][0-9] GHz\)/
                ]));
                price = US.randomInteger(300, 800);
                primary = US.randExp(/(8|12|13|16) MP/);
                secondary = US.randExp(/(5|8|12) MP/);
                battery = US.randExp(/(2[5-9]|3[0-3])00 mAh/);
                break;
            default:
                resolution = US.valueFromArray([
                    '2160 x 3840',
                    '1440 x 2960',
                    '1440 x 2880',
                    '1125 x 2436',
                    '1080 x 2220',
                    '1080 x 1920'
                ]);
                ram = US.randExp(/(4|6|8) GB/);
                rom = US.randExp(/(64|128|256) GB/);
                cpu = US.randExp(US.valueFromArray([
                    /octa-core \(8x[2-3]\.[0-9][0-9] GHz\)/,
                    /octa-core \(6x[2-3]\.[5-9][0-9] GHz, 2x[1-2]\.[0-4][0-9] GHz \)/,
                    /octa-core \(4x[2-3]\.[5-9][0-9] GHz, 4x[1-2]\.[0-4][0-9] GHz \)/,
                    /hexa-core \(6x[3-4]\.[0-9][0-9] GHz\)/, 
                    /quad-core \(4x[3-4]\.[0-9][0-9] GHz\)/
                ]));
                primary = US.randExp(/(double){0,1} (12|13|16|20|40) MP/);
                secondary = US.randExp(/(double){0,1} (12|13|16) MP/);
                battery = US.randExp(/(3[5-9]|[4-5][0-9])00 mAh/);
                price = US.randomInteger(950, 2200);
        }
        const colors: Array<string> = US.valuesFromArray(phoneColors);
        const modelCode: string = US.randExp(/[G-P]{2,4}-[1-9][0-9]{2,3}/);
        const network: string = US.chance(17) ? '3G' : 'LTE';
        const screen = {
            resolution: resolution,
            size: US.randExp(/[4-6](\.[1-7]){0,1} inch/)
        };
        const platform = {
            os: (brand === 'Apple') ? 
                `iOS ${US.truncateReal(US.randomReal(10, 12))}` : 
                `Android ${US.truncateReal(US.randomReal(6, 8))}`,
            chipset: chipset,
            gpu: gpu,
            cpu: cpu
        };
        const memory = {
            cardSlot: (brand === 'Apple')  ? false : US.chance() ? true : false,
            ram: ram,
            rom: rom
        };

        for (let i: number = 0; i <= colors.length - 1; i++ ) {
            phones.push({
                brand: brand,
                modelCode: modelCode,
                phonesCharacteristics: {
                    network: network,
                    screen: screen,
                    platform: platform,
                    memory: memory,
                    camera: {
                        primary: primary,
                        secondary: secondary
                    },
                    battery: battery            
                },
                factoryPrice: US.truncateReal(price * US.randomReal(0.95, 1.05), 2),
                color: colors[i]
            });
        }
        return phones;

    }
}

export {
    IPhone,
    RandomPhoneModel
}
import {} from 'jasmine';
import { UsefulStuff } from './index';

const resultsForValueFormArrayByPercentage = function (elements: Array<string>, percentages: Array<number>): void {
    console.log(`\nResults for UsefulStuff.valueFormArrayByPercentage(${elements}, ${percentages}):\n`);
    // tslint:disable-next-line:prefer-const
    let aux: any = {};
    for (let i: number = 1; i <= 10; i++) {         
        const chosen: string = UsefulStuff.valueFormArrayByPercentage(elements, percentages);
        aux[chosen] = (aux[chosen]) ? aux[chosen] + 1 : 1;
    }
    for (let i: number = 0; i <= elements.length - 1; i++) {
        console.log(`Element ${elements[i]} appears for ${(aux[elements[i]]) ? aux[elements[i]] : 0} ${(aux[elements[i]] === 1) ? 'time.' : 'times.' } It's percentage is ${percentages[i]}.`);
    }
}

describe('Test methods for math:', () => {
    beforeAll(() => {console.log('\nTesting methods for math:')});
    afterAll(() => {console.log('\n')});
    // method randomInteger
    for (let i: number = 0; i <= 10; i++) {
        it('randomInteger(50, 150) is a natural number between 50 and 150', () => {
            const randomNumber: number = UsefulStuff.randomInteger(50, 150);
            expect(randomNumber).toBeLessThanOrEqual(150);
            expect(randomNumber).toBeGreaterThanOrEqual(50);
        });
    }  
    it('randomInteger(50, 50) throws an error', () => {
        expect(() => { UsefulStuff.randomInteger(50, 50) }).not.toThrow();        
    });
    it('randomInteger(50, -50) throws an error', () => {
        expect(() => { UsefulStuff.randomInteger(50, -50) }).toThrow();        
    });
    it('chance(-50) throws an error', () => {
        expect(() => { UsefulStuff.chance(-50)}).toThrow();
    });
    it('chance(1) throws an error', () => {
        expect(() => { UsefulStuff.chance(1)}).toThrow();
    });
    it('chance(5000) throws an error', () => {
        expect(() => { UsefulStuff.chance(5000)}).toThrow();
    });
    it('chance(20) must return a boolean', () => {
        expect([true, false]).toContain(UsefulStuff.chance(20))
    }); 
    it('chance(1000) sometimes must return true', () => {
        let isTrue: boolean = false;
        for (let i: number = 0; i <= 100000; i++) {
            if (UsefulStuff.chance(1000)) {
                isTrue = true;
                break;
            }
        }
        expect(isTrue).toBe(true);
    }); 
    // method natural number
    it('number -5 is not natural', () => {
        expect(() => {UsefulStuff.natural(-5)}).toThrow();
    });
    it('number 5.25 is not natural', () => {
        expect(() => {UsefulStuff.natural(5.25)}).toThrow();
    });
    it('number 0 is not natural', () => {
        expect(() => {UsefulStuff.natural(0)}).toThrow();
    });
    it('number 10 is not natural', () => {
        expect(() => {UsefulStuff.natural(10)}).not.toThrow();
    });


});

describe('testing methods for arrays', () => {
    beforeAll(() => {console.log('\nTesting methods for arrays:')});
    // methods randomInteger from array
    it('array is empty, throws error', () => {
        expect(() => {UsefulStuff.valueFromArray([])}).toThrow();
    });
    it('array is empty, throws error', () => {
        expect(() => {UsefulStuff.valueFromList()}).toThrow();
    });
    for (let i: number = 0; i <= 10; i++) {
        it('valueFromArray([50, 20, 30]) is 50 or 20 or 30', () => {
            expect([50, 20, 30]).toContain(UsefulStuff.valueFromArray([50, 20, 30]));
        });
    }
    for (let i: number = 0; i <= 1000; i++) {
        it('valueFromList(50, 20, 30) is 50 or 20 or 30', () => {
            expect([50, '20', 30, true, false]).toContain(UsefulStuff.valueFromList<string | number | boolean>(50, '20', 30, false));
        });
    }  
    for (let i: number = 0; i <= 10; i++) {
        it('valueFromArray([50, 20, 30]) is 50 or 20 or 30', () => {
            expect([50, 20, 30]).toContain(UsefulStuff.valueFromArray([50, 20, 30]));
        });
    }
    
    // method to verify index for an array
    it('array is empty, throws error', () => {
        expect(() => {UsefulStuff.indexInRange([], 0)}).toThrow();
    });
    it('index -5 in vector [6, 25, 8, 10, 4, 15, 32] is not a natural number', () => {
        expect(() => {UsefulStuff.indexInRange([6, 25, 8, 10, 4, 15, 32], -5)}).toThrow();
    });
    it('index 5.3 in vector [6, 25, 8, 10, 4, 15, 32] is not a natural number', () => {
        expect(() => {UsefulStuff.indexInRange([6, 25, 8, 10, 4, 15, 32], 5.3)}).toThrow();
    });
    it('index 0 in vector [6, 25, 8, 10, 4, 15, 32] is correct', () => {
        expect(() => {UsefulStuff.indexInRange([6, 25, 8, 10, 4, 15, 32], 0)}).not.toThrow();
    });
    it('index 8 in vector [6, 25, 8, 10, 4, 15, 32] is out of range', () => {
        expect(() => {UsefulStuff.indexInRange([6, 25, 8, 10, 4, 15, 32], 8)}).toThrow()
    });
    it('index 7 in vector [6, 25, 8, 10, 4, 15, 32] is out of range', () => {
        expect(() => {UsefulStuff.indexInRange([6, 25, 8, 10, 4, 15, 32], 7)}).toThrow()
    });
    it('index 5.2 in vector [6, 25, 8, 10, 4, 15, 32] is not a natural number', () => {
        expect(() => {UsefulStuff.indexInRange([6, 25, 8, 10, 4, 15, 32], 5.2)}).toThrow()
    });
    it('index 5 in vector [6, 25, 8, 10, 4, 15, 32] is correct', () => {
        expect(() => {UsefulStuff.indexInRange([6, 25, 8, 10, 4, 15, 32], 5)}).not.toThrow()
    });
    it('index 6 in vector [6, 25, 8, 10, 4, 15, 32] is correct', () => {
        expect(() => {UsefulStuff.indexInRange([6, 25, 8, 10, 4, 15, 32], 6)}).not.toThrow()
    });
    // method sum of first elements in an array
    it('array is empty, throws error', () => {
        expect(() => {UsefulStuff.sumOfElements([], 1)}).toThrow();
    });
    it('index 5.2 in vector [6, 25, 8, 10, 4, 15, 32] is not a natural number', () => {
        expect(() => {UsefulStuff.sumOfElements([6, 25, 8, 10, 4, 15, 32], 5.2)}).toThrow();
    });
    it('sum of first 3 elements in array [6, 25, 8, 10, 4, 15, 32] is 39', () => {
        expect(UsefulStuff.sumOfElements([6, 25, 8, 10, 4, 15, 32], 3)).toEqual(39);
    });
    it('sum of first 4 elements in array [6, 25, 8, 10, 4, 15, 32] is 49', () => {
        expect(UsefulStuff.sumOfElements([6, 25, 8, 10, 4, 15, 32], 4)).toEqual(49);
    });
    it('sum of first 7 elements in array [6, 25, 8, 10, 4, 15, 32] is 100', () => {
        expect(UsefulStuff.sumOfElements([6, 25, 8, 10, 4, 15, 32], 7)).toEqual(100);
    });
    it('sum of first element in array [6, 25, 8, 10, 4, 15, 32] is 6', () => {
        expect(UsefulStuff.sumOfElements([6, 25, 8, 10, 4, 15, 32], 1)).toEqual(6);
    });
    it('sum of first 8 elements in array [6, 25, 8, 10, 4, 15, 32] throws index out of range', () => {
        expect(() => {UsefulStuff.sumOfElements([6, 25, 8, 10, 4, 15, 32], 8)}).toThrow();
    });
    it('sum of none of elements in array [6, 25, 8, 10, 4, 15, 32] throws index out of range', () => {
        expect(() => {UsefulStuff.sumOfElements([6, 25, 8, 10, 4, 15, 32], 0)}).toThrow();
    });  
    // empty array
    it('array is empty, throws error', () => {
        expect(() => {UsefulStuff.emptyArray([])}).toThrow();
    });
    it('array is not empty, it is ok', () => {
        expect(() => {UsefulStuff.emptyArray([5, true])}).not.toThrow();
    });
    // testing valueFormArrayByPercentage
    it('empty arrays will throw error', () => {
        expect(() => {UsefulStuff.valueFormArrayByPercentage([], [])}).toThrow();
    });
    it('empty arrays will throw error', () => {
        expect(() => {UsefulStuff.valueFormArrayByPercentage([], [1])}).toThrow();
    });
    afterAll(() => {        
        let elements: Array<string> = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        let percentages: Array<number> = [6, 25, 8, 10, 4, 15, 32];
        resultsForValueFormArrayByPercentage(elements, percentages);
        elements = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q'];
        percentages = [8, 9, 10, 1, 4, 3, 2, 6, 5, 1, 20, 6, 4, 3, 2, 11, 5];
        resultsForValueFormArrayByPercentage(elements, percentages);
        console.log('\n');
    })
});

describe('testing private functions made for valueFormArrayByPercentage', () => {
    beforeAll(() => {console.log('\nTesting private methods for valueFormArrayByPercentage:')});
    afterAll(() => {console.log('\n')});
    // testing min and max interval
    it('maxInterval for [6, 25, 8, 10, 4, 15, 32] is [6, 31, 39, 49, 53, 68, 100]', () => {
        expect(UsefulStuff['_maxInterval']([6, 25, 8, 10, 4, 15, 32])).toEqual([6, 31, 39, 49, 53, 68, 100]);
    });
    it('minInterval for [6, 25, 8, 10, 4, 15, 32] is [1, 7, 32, 40, 50, 54, 69]', () => {
        expect(UsefulStuff['_minInterval']([6, 25, 8, 10, 4, 15, 32])).toEqual([1, 7, 32, 40, 50, 54, 69]);
    });
    it('maxInterval for [6] is [6]', () => {
        expect(UsefulStuff['_maxInterval']([6])).toEqual([6]);
    });
    it('minInterval for [6] is [1]', () => {
        expect(UsefulStuff['_minInterval']([6])).toEqual([1]);
    });  
    it('minInterval for [8, 9, 10, 1, 4, 3, 2, 6, 5, 1, 20, 6, 4, 3, 2, 11, 5] is [1, 9, 18, 28, 29, 33, 36, 38, 44, 49, 50, 70, 76, 80, 83, 85, 96]', () => {
        expect(UsefulStuff['_minInterval']([8, 9, 10, 1, 4, 3, 2, 6, 5, 1, 20, 6, 4, 3, 2, 11, 5]))
            .toEqual([1, 9, 18, 28, 29, 33, 36, 38, 44, 49, 50, 70, 76, 80, 83, 85, 96]);
    });
    it('maxInterval for [8, 9, 10, 1, 4, 3, 2, 6, 5, 1, 20, 6, 4, 3, 2, 11, 5] is [8, 17, 27, 28, 32, 35, 37, 43, 48, 49, 69, 75, 79, 82, 84, 95, 100]', () => {
        expect(UsefulStuff['_maxInterval']([8, 9, 10, 1, 4, 3, 2, 6, 5, 1, 20, 6, 4, 3, 2, 11, 5]))
            .toEqual([8, 17, 27, 28, 32, 35, 37, 43, 48, 49, 69, 75, 79, 82, 84, 95, 100]);
    });
    // testing indexByPercentage
    it('sum of percentages in array [6, 25, 8, 10, 4, 15, 33] is not 100', () => {
        expect(() => {UsefulStuff['_indexByPercentage']([6, 25, 8, 10, 4, 15, 33])}).toThrow();
    });
    it('index by percentage based on array [6, 25, 8, 10, 4, 15, 32] returns a natural number in [0, 6] ', () => {        
        const indexByPercentage: number = UsefulStuff['_indexByPercentage']([6, 25, 8, 10, 4, 15, 32]);
        expect(indexByPercentage).toBeGreaterThanOrEqual(0);
        expect(indexByPercentage).toBeLessThanOrEqual(6);
    });
});

describe('Testing string functions', () => {
    beforeAll(() => {console.log('\nTesting string functions:')});
    afterAll(() => {console.log('\n')});
    it('verify simple word(only latin letters)', () => { 
        expect(() => {UsefulStuff.validWord('fw4')}).toThrow(); 
    });
    it('verify simple word(only latin letters)', () => { 
        expect(() => {UsefulStuff.validWord('fw ')}).toThrow(); 
    });
    it('verify simple word(only latin letters)', () => { 
        expect(() => {UsefulStuff.validWord('f')}).not.toThrow(); 
    });
    it('proper case throws error', () => { 
        expect(() => {UsefulStuff.toProperCase('maria ')}).toThrow(); 
    });
    it('return a proper case from a word', () => {
        expect(UsefulStuff.toProperCase('maria')).toEqual('Maria');
    })
});
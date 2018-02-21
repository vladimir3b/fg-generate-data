const RandExp: any = require('randexp');

export class UsefulStuff {
    public static randomInteger(min: number, max: number): number {
        if (min > max) {
            throw new Error('Number min must be smaller than max.');
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public static randomReal(min: number, max: number): number {
        if (min > max) {
            throw new Error('Number min must be smaller than max.');
        }
        return Math.random() * (max - min) + min;
    }
    public static valueFromArray<T>(a: Array<T>): T {
        this.emptyArray(a);
        return a[this.randomInteger(0, a.length - 1)];
    }
    public static valueFormArrayByPercentage<T>(values: Array<T>, percentages: Array<number>): T {
        this.emptyArray(values);
        this.emptyArray(percentages);
        if (values.length !== percentages.length) {
            throw new Error('Every value must have a percentage.');            
        }
        return values[this._indexByPercentage(percentages)];
    }
    public static valueFromList<T>(...a: Array<T>): T {
        this.emptyArray(a);
        return this.valueFromArray(a);
    }
    public static chance(factor: number = 2): boolean {
        if ((factor <= 1) || (factor >= 5000)) {
            throw new Error('Wrong chance factor. Factor must be between 2 and 5000');
        }        
        return this.randomInteger(5000, 6000) % factor === 1;
    }
    public static natural(n: number): void {
        if (n <= 0) {
            throw new Error('Must be a natural number greater than 0.');
        }
        if (Math.floor(n) !== n) {
            throw new Error('Must be a natural number greater than 0.');
        }
    }
    public static indexInRange(a: Array<number>, index: number): void {
        this.emptyArray(a);
        if (index) {
            this.natural(index);
        }
        if (index >= a.length) {
            throw new Error('Index out of range.');
            
        }
    }
    public static sumOfElements(a: Array<number>, index: number): number {
        this.emptyArray(a);
        index = index - 1;
        this.indexInRange(a, index);
        let sum: number = 0;
        for (let i: number = 0; i <= index; i++) {
            sum += a[i];
        }
        return sum;
    }
    public static emptyArray<T>(a: Array<T>): void {
        if (!a.length) {
            throw new Error('Empty array.')
        }
    }
    private static _indexByPercentage(a: Array<number>): number {
        if (this.sumOfElements(a, a.length) !== 100) {
            throw new Error('Sum of percentages is not 100.');
        }
        for (let i: number = 0; i <= a.length - 1; i++) {
            this.natural(a[i]);
        }
        const minInterval: Array<number> = this._minInterval(a);
        const maxInterval: Array<number> = this._maxInterval(a);    
        const randomNumber = this.randomInteger(1, 100);    
        for (let i: number = 0; i <= a.length - 1; i++) {
            if ((minInterval[i] <= randomNumber) && (maxInterval[i] >= randomNumber)) {
                return i;
            }
        }
        return 0; // this is never reached but it is necessary for typescript
    }        
    private static _minInterval(a: Array<number>): Array<number> {
        const minInterval: Array<number> = [1];     
        for (let i: number = 1; i <= a.length - 1; i++) {            
            minInterval[i] = minInterval[i - 1] + a[i - 1];            
        }
        return minInterval;
    }
    private static _maxInterval(a: Array<number>): Array<number> {
        const maxInterval: Array<number> = [a[0]];
        for (let i: number = 1; i <= a.length - 1; i++) {            
            maxInterval[i] = maxInterval[i - 1] + a[i];           
        }
        return maxInterval;
    }
    public static validWord(string: string): void {
        if (!/^([a-z]{1,50})$/.test(string.toLowerCase())) {
            throw new Error('Wrong word - only letters accepted, maximum 50.')
        }
    }
    public static toProperCase(string: string): string {
        this.validWord(string);
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
    }
    public static randExp(exp: RegExp): string {
        return new RandExp(exp).gen();
    }
    public static truncateReal(realNumber: number, numberOfDecimals: number = 2): number {
        return Math.floor(realNumber * Math.pow(10, numberOfDecimals)) / Math.pow(10, numberOfDecimals);
    }
    public static valuesFromArray<T>(data: Array<T>, numberOfReturnedElements: number = this.randomInteger(1, data.length)): Array<T> {     
        const numberOfElements: number = data.length;
        const auxiliaryArray: Array<{element: T, selected: boolean}> = [];
        const returnData: Array<T> = [];        
        if (numberOfReturnedElements > numberOfElements) {
            throw new Error('Number of elements of the returned array must be smaller or equal to the number of elements of the initial array.');
        }
        for (let i = 0; i <= numberOfElements - 1; i++) {    
            auxiliaryArray.push({
                element: data[i],
                selected: false
            });            
        }   
        for (let i = 0; i <= numberOfReturnedElements - 1; i++) {
            let index: number;
            do {
                index = this.randomInteger(0, numberOfElements - 1);                
            } while ((auxiliaryArray[index]).selected);
            auxiliaryArray[index].selected = true;
            returnData.push(auxiliaryArray[index].element);
        }
        return returnData;
    }
}


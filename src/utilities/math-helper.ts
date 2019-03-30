export default class MathHelper {
    constructor() {
        
    }

    isNumberBetweenRange(number: number, minimum: number, maximum: number) {
        return number >= minimum && number <= maximum;
    }
}
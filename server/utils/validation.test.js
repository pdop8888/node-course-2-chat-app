// validation.test.js

const expect = require('expect');

const{isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const str = 17;
        expect(isRealString(str)).toBeFalsy();
    });

    it('should reject string wih only spaces', () => {
        const str = '    ';
        expect(isRealString(str)).toBeFalsy();
    });

    it('should reject non-string values', () => {
        const str = 'niwenfiweniufnwejkf';
        expect(isRealString(str)).toBeTruthy();
    });
});
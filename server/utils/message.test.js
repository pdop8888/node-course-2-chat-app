// message.test.js

const expect = require('expect');

const {generateMessage} = require('./message');
const {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Jen';
        const text = 'Some message';
        const message = generateMessage(from,text);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Jen';
        const latitude = 20;
        const longitude = 10;
        const message = generateLocationMessage(from,latitude,longitude);
        const expectedUrl =  `https://www.google.com/maps?q=${latitude},${longitude}`;

        expect(typeof message.createdAt).toBe('number');
        expect(message.url).toBe(expectedUrl);
    });
});
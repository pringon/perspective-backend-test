import { describe, expect, test } from '@jest/globals';
import { isEmail, isString } from '../../src/util/validators';

describe('validators', () => {
    describe('isString', () => {
        test('should return true for strings', () => {
            expect(isString('123')).toBe(true);
        });
        test('should return false for non-strings', () => {
            expect(isString(123)).toBe(false);
            expect(isString({})).toBe(false);
            expect(isString({ hello: 'there' })).toBe(false);
        });
    });
    describe('isEmail', () => {
        test('should return true for valid emails', () => {
            expect(isString('dan@test.come')).toBe(true);
            expect(isString('dan@gmail.com')).toBe(true);
            expect(isString('dan@yahoo.co')).toBe(true);
            expect(isString('dan@company.net')).toBe(true);
            expect(isString('dan@charity.org')).toBe(true);
        });
        test('should return false for non-strings', () => {
            expect(isString(123)).toBe(false);
            expect(isString({})).toBe(false);
            expect(isString({ hello: 'there' })).toBe(false);
        });
        test('should return false for invalid emails', () => {
            expect(isEmail('gew.com')).toBe(false);
            expect(isEmail('gew@yahoo')).toBe(false);
            expect(isEmail('dan@companyco')).toBe(false);
            expect(isEmail('dancompany.co')).toBe(false);
            expect(isEmail('dan@company@me.co')).toBe(false);
        });
    });
});

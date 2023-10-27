import { describe, expect, test } from '@jest/globals';
import { asString, asNumber } from '../../src/util/environment';

describe('environment', () => {
    describe('asString', () => {
        test('should return default value when environment not set', () => {
            const varName = 'PERSPECTIVE_TEST_VAR_DOES_NOT_EXIST';
            delete process.env[varName];

            expect(asString(varName, 'default')).toBe('default');
        });
        test('should return environment when set', () => {
            const varName = 'PERSPECTIVE_TEST_VAR_DOES_NOT_EXIST';
            process.env[varName] = 'test_value';

            expect(asString(varName)).toBe('test_value');
            expect(asString(varName, 'default')).toBe('test_value');
        });
        test('should error when environment not set and no default value', () => {
            const varName = 'PERSPECTIVE_TEST_VAR_DOES_NOT_EXIST';
            delete process.env[varName];

            expect(() => asString(varName)).toThrow();
        });
    });
    describe('asNumber', () => {
        test('should return default value when environment not set', () => {
            const varName = 'PERSPECTIVE_TEST_VAR_DOES_NOT_EXIST';
            delete process.env[varName];

            expect(asNumber(varName, 123)).toBe(123);
        });
        test('should return environment when set', () => {
            const varName = 'PERSPECTIVE_TEST_VAR_DOES_NOT_EXIST';
            process.env[varName] = String(42);

            expect(asNumber(varName)).toBe(42);
            expect(asNumber(varName, 123)).toBe(42);
        });
        test('should error when environment not set and no default value', () => {
            const varName = 'PERSPECTIVE_TEST_VAR_DOES_NOT_EXIST';
            delete process.env[varName];

            expect(() => asNumber(varName)).toThrow();
        });
        test('should error when environment is nost castable to number', () => {
            const varName = 'PERSPECTIVE_TEST_VAR_DOES_NOT_EXIST';
            process.env[varName] = 'default_value';

            expect(() => asNumber(varName)).toThrow();
            expect(() => asNumber(varName, 123)).toThrow();
        });
    });
});

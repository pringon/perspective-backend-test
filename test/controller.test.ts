/* eslint-disable  @typescript-eslint/no-explicit-any */
import { jest, describe, expect, test } from '@jest/globals';

import User, { UserRepository } from '../src/repository';
import { makeController } from '../src/controller';

const MOCK_USERS: User[] = [
    {
        id: '123',
        name: 'Dan',
        email: 'dan@test.com',
        createdAt: new Date('2000-01-01'),
    },
    {
        id: '345',
        name: 'Ana',
        email: 'ana@test.com',
        createdAt: new Date('2010-01-01'),
    },
];

const FAKE_REPO: UserRepository = {
    getUsers: async (asc) => (asc ? MOCK_USERS : MOCK_USERS.slice().reverse()),
    addUser: async (name, email) => {
        return {
            id: '123',
            name,
            email,
            createdAt: new Date(),
        };
    },
};
const ERRORING_REPO: UserRepository = {
    getUsers: async () => { throw Error("Transient failure"); },
    addUser: async () => { throw Error("Transient failure"); },
};

describe('user controller', () => {
    describe('getting all users', () => {
        test('should return users ascending by default', async () => {
            const req: any = {
                query: {},
            };
            const res: any = {};
            res.status = jest.fn(() => res);
            res.json = jest.fn(() => res);

            const controller = makeController(FAKE_REPO);
            await controller.getUsers(req, res);

            expect(res.status.mock.calls[0][0]).toBe(200);
            expect(res.json.mock.calls[0][0]).toStrictEqual({
                code: 200,
                users: MOCK_USERS,
            });
        });
        test('should be able to sort by created in ascending order', async () => {
            const controller = makeController(FAKE_REPO);

            for (const created of ['ASC', 'asc', 'aSc']) {
                const req: any = {
                    query: { created },
                };
                const res: any = {};
                res.status = jest.fn(() => res);
                res.json = jest.fn(() => res);

                await controller.getUsers(req, res);

                expect(res.status.mock.calls[0][0]).toBe(200);
                expect(res.json.mock.calls[0][0]).toStrictEqual({
                    code: 200,
                    users: MOCK_USERS,
                });
            }
        });
        test('should be able to sort by created in descending order', async () => {
            const controller = makeController(FAKE_REPO);

            for (const created of ['DESC', 'desc', 'dEsC']) {
                const req: any = {
                    query: { created },
                };
                const res: any = {};
                res.status = jest.fn(() => res);
                res.json = jest.fn(() => res);

                await controller.getUsers(req, res);

                expect(res.status).lastCalledWith(200);
                expect(res.json).lastCalledWith({
                    code: 200,
                    users: MOCK_USERS.slice().reverse(),
                });
            }
        });
        test('should 400 for non-string created parameter', async () => {
            const controller = makeController(FAKE_REPO);

            const req: any = {
                query: { created: 123 },
            };
            const res: any = {};
            res.status = jest.fn(() => res);
            res.json = jest.fn(() => res);

            await controller.getUsers(req, res);

            expect(res.status).lastCalledWith(400);
            expect(res.json).lastCalledWith({
                code: 400,
                message: expect.stringContaining('created'),
            });
        });
        test('should 500 for repo errors', async () => {
            const controller = makeController(ERRORING_REPO);

            const req: any = {
                query: {}
            };
            const res: any = {};
            res.status = jest.fn(() => res);
            res.json = jest.fn(() => res);

            await controller.getUsers(req, res);

            expect(res.status).lastCalledWith(500);
        });
    });
    describe('creating a user', () => {
        test('should be able to create a user', async () => {
            const spy = jest.spyOn(FAKE_REPO, 'addUser');
            spy.mockReturnValue(new Promise((resolve) => resolve({ id: '333' } as User)));
            const controller = makeController(FAKE_REPO);

            const req: any = {
                body: {
                    name: 'Dan',
                    email: 'dan@test.com',
                },
            };
            const res: any = {};
            res.status = jest.fn(() => res);
            res.json = jest.fn(() => res);

            await controller.postUser(req, res);

            expect(res.status).lastCalledWith(201);
            expect(res.json).lastCalledWith({
                code: 201,
                userId: '333',
            });
        });
        test('should 400 when name is not provided', async () => {
            const controller = makeController(FAKE_REPO);

            const req: any = {
                body: {
                    email: 'dan@test.com',
                },
            };
            const res: any = {};
            res.status = jest.fn(() => res);
            res.json = jest.fn(() => res);

            await controller.postUser(req, res);

            expect(res.status).lastCalledWith(400);
            expect(res.json).lastCalledWith({
                code: 400,
                message: expect.stringContaining('name'),
            });
        });
        test('should 400 when email is not provided', async () => {
            const controller = makeController(FAKE_REPO);

            const req: any = {
                body: {
                    name: 'Dan',
                },
            };
            const res: any = {};
            res.status = jest.fn(() => res);
            res.json = jest.fn(() => res);

            await controller.postUser(req, res);

            expect(res.status).lastCalledWith(400);
            expect(res.json).lastCalledWith({
                code: 400,
                message: expect.stringContaining('email'),
            });
        });
        test('should 400 for invalid email', async () => {
            const controller = makeController(FAKE_REPO);

            const req: any = {
                body: {
                    name: 'Dan',
                    email: 'dantest.com',
                },
            };
            const res: any = {};
            res.status = jest.fn(() => res);
            res.json = jest.fn(() => res);

            await controller.postUser(req, res);

            expect(res.status).lastCalledWith(400);
            expect(res.json).lastCalledWith({
                code: 400,
                message: expect.stringContaining('email'),
            });
        });
        test('should 500 for repo errors', async () => {
            const controller = makeController(ERRORING_REPO);

            const req: any = {
                body: {
                    name: 'Dan',
                    email: 'dan@test.com',
                },
            };
            const res: any = {};
            res.status = jest.fn(() => res);
            res.json = jest.fn(() => res);

            await controller.postUser(req, res);

            expect(res.status).lastCalledWith(500);
        });
    });
});

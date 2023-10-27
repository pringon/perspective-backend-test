export { makeController };

import { Request, Response } from 'express';

import { UserRepository } from './repository';
import { isString, isEmail } from './util/validators';

type UserController = {
    getUsers: (req: Request, res: Response) => Promise<void>;
    postUser: (req: Request, res: Response) => Promise<void>;
};

function makeController(repo: UserRepository): UserController {
    return {
        getUsers: async (req, res) => {
            let asc = true;
            if (req.query.created) {
                const { created } = req.query;
                if (!isString(created) || !['asc', 'desc'].includes(created.toLowerCase())) {
                    res.status(400).json({
                        code: 400,
                        message: 'Optional created parameter must either be ASC or DESC',
                    });
                    return;
                }
                asc = created.toLowerCase() === 'asc';
            }
            try {
                const users = await repo.getUsers(asc);
                res.status(200).json({ code: 200, users });
            } catch (err) {
                console.error(err);
                res.status(500).json({ code: 500, message: "Unexpected error" });
            }
        },
        postUser: async (req, res) => {
            const { name, email } = req.body;
            if (!isString(name)) {
                res.status(400).json({ code: 400, message: 'Expected string parameter name' });
                return;
            }
            if (!isEmail(email)) {
                res.status(400).json({ code: 400, message: 'Malformed email parameter' });
                return;
            }
            try {
                const user = await repo.addUser(name, email);
                res.status(201).json({ code: 201, userId: user.id });
            } catch (err) {
                console.error(err);
                res.status(500).json({ code: 500, message: "Unexpected error" });
            }
        },
    };
}

export { makeRepository, User, UserRepository };

import { Entity, PrimaryGeneratedColumn, Column, DataSource } from 'typeorm';

@Entity({ name: 'user' })
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'text',
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        name: 'created_at',
        type: 'timestamptz',
        nullable: false,
    })
    createdAt: Date;
}

type UserRepository = {
    // TODO: Consider paginating
    getUsers: (asc: boolean) => Promise<User[]>;
    addUser: (name: string, email: string) => Promise<User>;
};

// TODO: Add integration tests
function makeRepository(ds: DataSource): UserRepository {
    return {
        getUsers: async (asc = true): Promise<User[]> => {
            return ds.manager.find(User, {
                order: { createdAt: asc ? 'ASC' : 'DESC' },
            });
        },
        addUser: async (name: string, email: string): Promise<User> => {
            const user = new User();
            user.name = name;
            user.email = email;
            await ds.manager.save(user);
            return user;
        },
    };
}

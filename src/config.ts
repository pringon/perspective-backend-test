export { Config, PostgresConnInfo, makeConfig };

import { asString, asNumber } from './util/environment';

type Config = {
    api: APIConfing;
    database: PostgresConnInfo;
};

type APIConfing = {
    port: number;
};

type PostgresConnInfo = {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    migrations: string[];
};

function makeConfig(): Config {
    return {
        api: {
            port: asNumber("PORT", 3111),
        },
        database: {
            type: 'postgres',
            host: asString('PG_HOST', 'postgres'),
            port: asNumber('PG_PORT', 5432),
            username: asString('PG_USER', 'postgres'),
            password: asString('PG_PASSWORD', 'postgres'),
            database: asString('PG_DATABASE', 'perspective'),
            entities: ['src/repository.ts'],
            migrations: ['src/migration/**/*.ts'],
        },
    };
}

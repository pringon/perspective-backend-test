import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { makeConfig } from './config';
import { makeApi } from './api';
import { makeRepository } from './repository';

dotenv.config();

const conf = makeConfig();
const ds = new DataSource(conf.database);

// TODO: Validation pipeline.
// TODO: IaC and deployment pipeline.
(async () => {
    await ds.initialize();
    const userRepo = makeRepository(ds);
    const app = makeApi(userRepo);

    const port = conf.api.port;
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
})();

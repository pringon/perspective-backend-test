import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { makeConfig } from './config';

dotenv.config();

const conf = makeConfig();
const ds = new DataSource(conf.database);

ds.initialize();
export default ds;

import ormSeedConfig from '@app/ormseedconfig';
import { DataSource } from 'typeorm';

export default new DataSource(ormSeedConfig);

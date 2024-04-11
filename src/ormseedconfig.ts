import ormConfig from '@app/ormconfig';

const ormSeedConfig = {
  ...ormConfig,
  migrations: ['src/seeds/*.ts'],
};

export default ormSeedConfig;

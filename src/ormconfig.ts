import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pony',
  password: '220694',
  database: 'balance_api',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

// const config: PostgresConnectionOptions = {
//   type: 'postgres',
//   host: 'c3lej1b0k5gkeq.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com',
//   port: 5432,
//   username: 'ufo191ad5ovn1k',
//   password: 'pc5041673d004e94a8efbbd8a85ca534bca77b21e67a8a8c1cd7675a4f65b6e1f',
//   database: 'ddf3cqb84qiae3',
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: true,
//   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
// };

export default config;

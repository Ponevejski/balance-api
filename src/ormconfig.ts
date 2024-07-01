import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// const config: PostgresConnectionOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'pony',
//   password: '220694',
//   database: 'balance_api',
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: false,
//   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
// };

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'dpg-cq19paiju9rs73bj1q1g-a.frankfurt-postgres.render.com',
  port: 5432,
  username: 'balance_api_db_user',
  password: 'ETrqMhqJvkkhobs6c6ylkL2HJ179t7FS',
  database: 'balance_api_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false, // This should be set according to your security requirements
  },
};

export default config;

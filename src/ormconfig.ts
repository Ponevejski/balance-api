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
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false, // For development purposes, set to true in production with proper CA
  },
};

export default config;

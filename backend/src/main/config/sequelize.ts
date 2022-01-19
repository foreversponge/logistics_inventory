import { Sequelize } from 'sequelize-typescript';
import path from 'path';

export const sequelize = new Sequelize({
  database: 'inventory',
  dialect: 'mysql',
  host: "localhost",
  username: "root",    //replace with your own local database usernamne
  password: "mysqlpw", //replace with your own local database password
  storage: ':memory:',
  models: [path.join(__dirname, '..', 'models', '*.ts')],
  define: {
    freezeTableName: true,
  },
  logging: false
});

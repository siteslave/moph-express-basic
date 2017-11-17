import Knex = require('knex');

declare global {
  namespace Express {
    export interface Request {
      db: Knex;
      session: any;
      io: any;
    }

    export interface Application {
      io: any;
    }
  }
}
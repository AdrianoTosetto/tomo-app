import { ConnectionManager, getConnectionManager, createConnection, Repository, Connection } from "typeorm"

import { Interest } from '../models/interests/interest'
import { InterestRepository } from '../models/interests/repository'
import { InterestController } from '../controllers/interests/interests.controller'

export class DataBaseConnector {
  private static connection: Connection;
  private constructor() { }

  public static async getConnection(): Promise<Connection> {
    if (!DataBaseConnector.connection) {
      console.log('falling here')
      DataBaseConnector.connection = await createConnection({
        type: "postgres",
        host: "tomo-app_postgres_1",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "tomodb",
        entities: [Interest],
      })
    }
    return DataBaseConnector.connection
  }
}
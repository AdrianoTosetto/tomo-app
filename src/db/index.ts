import { ConnectionManager, getConnectionManager, createConnection, Repository, Connection } from "typeorm"

import { Interest } from '../models/interests/interest'
import { InterestRepository } from '../models/interests/repository'
import { InterestController } from '../controllers/interests/interests.controller'

// export default (async () => {

//   const connection = await createConnection({
//     type: "postgres",
//     host: "tomo-app_postgres_1",
//     port: 5432,
//     username: "postgres",
//     password: "postgres",
//     database: "tomodb",
//     entities: [Interest],
//   });

//   // const interestRepository = connection.getCustomRepository(InterestRepository);
//   // const newInterest = new Interest();
//   // newInterest.name = 'Caminhada'

//   // await interestRepository.save(newInterest);

//   // await connection.close();

// })

export class dbConnector {
  connection: Connection;

  constructor() {
    this.initiateConnection();
  }

  async initiateConnection() {
    const connectionManager = getConnectionManager();
    this.connection = connectionManager.create({
      type: "postgres",
      host: "tomo-app_postgres_1",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "tomodb",
      entities: [Interest],
    });
  }

  async saveInterest(newInterest: Interest) {
    await this.connection.connect();

    const interestRepository = this.connection.getCustomRepository(InterestRepository);

    await interestRepository.save(newInterest);

    await this.connection.close();
  }

  async getInterestByName(name: string) {
    const interestRepository = this.connection.getCustomRepository(InterestRepository);

    const existingInterest = interestRepository.findByName(name);

    // await this.connection.close();

    return existingInterest;
  }
}
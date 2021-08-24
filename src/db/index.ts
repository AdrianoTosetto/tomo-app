import { createConnection, Repository } from "typeorm"

import { Interest } from '../models/interests/interest'
import { InterestRepository } from '../models/interests/repository'

export default (async () => {

  const connection = await createConnection({
    type: "postgres",
    host: "tomo-app_postgres_1",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "tomodb",
    entities: [Interest],
  });

  const interestRepository = connection.getCustomRepository(InterestRepository);
  const newInterest = new Interest();
  newInterest.name = 'Caminhada'

  await interestRepository.save(newInterest);

  await connection.close();

})

export class dbConnector {
  connection;

  constructor() {
    this.connection = createConnection({
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
    const interestRepository = this.connection.getCustomRepository(InterestRepository);

    await interestRepository.save(newInterest);

    await this.connection.close();
  }

  async getInterestByName(name: string) {
    const interestRepository = this.connection.getCustomRepository(InterestRepository);

    const existingInterest = await interestRepository.findByName(name);

    await this.connection.close();

    return existingInterest;
  }
}
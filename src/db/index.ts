import { createConnection } from "typeorm"

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


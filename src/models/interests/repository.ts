import { EntityRepository, Repository } from "typeorm"
import { Interest } from './interest'

@EntityRepository(Interest)
export class InterestRepository extends Repository<Interest> {

  findByName(interest_name: string) {
    return this
      .createQueryBuilder("interests")
      .where("interests.name = :interest_name", { interest_name })
  }
}

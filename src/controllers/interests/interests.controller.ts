import express from 'express'
import { getManager, getRepository, createConnection } from "typeorm"

import { Controller } from './../controller';
import { Interest } from '../../models/interests/interest';
import { InterestRepository } from '../../models/interests/repository';
import { DataBaseConnector } from '../../db/index';

// export class InterestController implements Controller {
//     path: string = '/interests';
//     router: express.Router = express.Router();

//     // @Get("/interests")
//     // getAll() {
//     //     return getManager().find(Interest);
//     // }

//     // @Get("/interests/:id")
//     // getAll(@Param("id") userId: number) {
//     //     return getRepository(Interest).findOne(userId);
//     // }


//     constructor() {
//         // this.insertMockData();
//         this.router.post(this.path, (req: express.Request, res: express.Response) => {

//             // const newInterest = new Interest();
//             // newInterest.name = 'Caminhada'
//             // this.connector.saveInterest(newInterest);

//             res.send(`Hello from route ${this.path}`)
//         })
//         this.router.get(this.path, async (req: express.Request, res: express.Response) => {

//             // const newInterest = new Interest();
//             // newInterest.name = 'Caminhada'
//             // this.connector.saveInterest(newInterest);

//             // const existingInterest = interestRepository.findByName(name);

//             // const interesses = await (await this.connector.getInterestByName('Caminhada')).getCount();

//             // res.send(`${interesses}`)

//             // res.send(`Hello from route ${this.path}, ${interesses}`)

//             // res.send(`kkk ${this.connector.getInterestByName('Caminhada')}`)
//         })
//     }

//     async insertMockData() {
//         const newInterest = new Interest();
//         newInterest.name = 'Caminhada';
//         const connection = await DataBaseConnector.getConnection();
//         await connection.connect();
//         const interestRepository = connection.getCustomRepository(InterestRepository);
//         await interestRepository.save(newInterest);
//         await connection.close();
//     }
// }

export class InterestController implements Controller {
    path: string = '/interests';
    router: express.Router = express.Router();


    constructor() {
        this.router.get(this.path, async (req: express.Request, res: express.Response) => {
            const name = String(req.query['name']);
            console.log(name);
            const interest = await (await DataBaseConnector.getConnection()).getCustomRepository(InterestRepository)
                .findByName(name).getOne();
            // .createQueryBuilder("interests").getOne()
            console.log(interest);
            res.send(`Hello from route ${this.path}, ${interest}`)

        })
    }
}
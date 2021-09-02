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
        this.router.get('/interests', async (req: express.Request, res: express.Response) => {
            const interests = await (await (await DataBaseConnector.getConnection()).getCustomRepository(InterestRepository).find({ select: ["id", "name"] }));
            res.send(`Get from route /interests, ${JSON.stringify(interests)}\n`);
            // console.log(interests);
        })
        this.router.get('/interests/:id', async (req: express.Request, res: express.Response) => {
            const id = String(req.params.id);
            const interest = await (await DataBaseConnector.getConnection()).getCustomRepository(InterestRepository).findOne(id);
            res.send(`Get from route /interests/${id}, ${interest.name}\n`)
        })
        this.router.post('/interests', async (req: express.Request, res: express.Response) => {
            let interest = new Interest();
            const name = String(req.body.name);
            const repo = await (await DataBaseConnector.getConnection()).getCustomRepository(InterestRepository);
            if (await repo.findByName(name).getOne() == undefined) {
                interest.name = name;
                repo.insert(interest);
            }
            res.send(`Post from route /interests, id: ${interest.id}, name: ${interest.name}\n`)
        })
        this.router.delete('/interests/:id', async (req: express.Request, res: express.Response) => {
            const id = String(req.params.id);
            await (await DataBaseConnector.getConnection()).getCustomRepository(InterestRepository).delete(id);
            res.send(`Delete from route /interests, ${id}\n`)
        })
        this.router.put('/interests/:id', async (req: express.Request, res: express.Response) => {
            const id = String(req.params.id);
            const interest = req.body;
            await (await DataBaseConnector.getConnection()).getCustomRepository(InterestRepository).update(id, interest);
            res.send(`Update from route /interests, id: ${id}, new name: ${interest.name}\n`)
        })
    }
}
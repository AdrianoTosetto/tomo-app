import express from 'express'
import { getManager, getRepository, createConnection } from "typeorm"

import { Controller } from './../controller';
import { Interest } from '../../models/interests/interest';
import { InterestRepository } from '../../models/interests/repository';
import { DataBaseConnector } from '../../db/index';

export class InterestController implements Controller {
    path: string = '/interests';
    router: express.Router = express.Router();


    constructor() {
        this.router.get(this.path, async (req: express.Request, res: express.Response) => {
            const interests = (await (await DataBaseConnector.getConnection()).getCustomRepository(InterestRepository).find({ select: ["id", "name"] }));
            res.send(`Get from route ${this.path}, ${JSON.stringify(interests)}\n`);
        })
        this.router.get(this.path + '/:id', async (req: express.Request, res: express.Response) => {
            const id = String(req.params.id);
            const interest = await (await DataBaseConnector.getConnection()).getCustomRepository(InterestRepository).findOne(id);
            if (interest != undefined) {
                res.send(`Get from route ${this.path}/${id}, ${interest.name}\n`)
            } else {
                res.status(404).send({ error: 'Interest not found' });
            }
        })
        this.router.post(this.path, async (req: express.Request, res: express.Response) => {
            const name = String(req.body.name);
            const repo = (await DataBaseConnector.getConnection()).getCustomRepository(InterestRepository);
            if (await repo.findByName(name).getOne() == undefined) {
                let interest = new Interest();
                interest.name = name;
                repo.insert(interest);
                interest = await repo.findByName(name).getOne();
                res.send(`Post from route ${this.path}, id: ${interest.id}, name: ${interest.name}\n`)
            } else {
                res.status(412).send({ error: 'Interest already exists' });
            }
        })
        this.router.delete(this.path + '/:id', async (req: express.Request, res: express.Response) => {
            const id = String(req.params.id);
            await (await DataBaseConnector.getConnection()).getCustomRepository(InterestRepository).delete(id);
            res.send(`Delete from route ${this.path}, ${id}\n`)
        })
        this.router.put(this.path + '/:id', async (req: express.Request, res: express.Response) => {
            const id = String(req.params.id);
            const repo = (await DataBaseConnector.getConnection()).getCustomRepository(InterestRepository);
            if ((await repo.findByIds([id])).length > 0) {
                const interest = req.body;
                await repo.update(id, interest);
                res.send(`Update from route ${this.path}, id: ${id}, new name: ${interest.name}\n`)
            } else {
                res.status(404).send({ error: 'Interest not found' });
            }
        })
    }
}
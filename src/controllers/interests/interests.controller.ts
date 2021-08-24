import express from 'express'
import { createConnection } from "typeorm"

import { Controller } from './../controller';
import { Interest } from '../../models/interests/interest';
import { InterestRepository } from '../../models/interests/repository';
import { dbConnector } from '../../db/index';

export class InterestController implements Controller {
    path: string = '/interests';
    router: express.Router = express.Router();
    connector: dbConnector;


    constructor() {
        this.connector = new dbConnector();
        const newInterest = new Interest();
        newInterest.name = 'Caminhada';
        this.connector.saveInterest(newInterest);
        this.router.post(this.path, (req: express.Request, res: express.Response) => {

            const newInterest = new Interest();
            newInterest.name = 'Caminhada'
            this.connector.saveInterest(newInterest);

            res.send(`Hello from route ${this.path}`)
        })
        this.router.get(this.path, (req: express.Request, res: express.Response) => {

            console.log("kkk")

            // const newInterest = new Interest();
            // newInterest.name = 'Caminhada'
            // this.connector.saveInterest(newInterest);

            // const interesses = this.connector.getInterestByName('Caminhada');

            // res.send(`${interesses}`)

            res.send(`kkk ${this.connector.getInterestByName('Caminhada')}`)
        })
    }
}

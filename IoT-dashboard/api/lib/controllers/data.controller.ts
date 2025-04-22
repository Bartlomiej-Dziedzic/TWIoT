import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    private dataService = new DataService();


    constructor() {
        this.initializeRoutes();
    }


    private initializeRoutes() {
        this.router.get(`${this.path}/get`, this.getAll);
        this.router.post(`${this.path}/post`, this.postItems);
        this.router.delete(`${this.path}/delete/:id`, this.deleteItem);
    }

    private getAll = async (request: Request, response: Response) => {
        const data = await this.dataService.getAll()
        response.send(data);
    }

    private postItems = async (request: Request, response: Response) => {
        try {
            const data = await this.dataService.post(request.body);
            response.status(201).send(`Dodano ${data}`);
        } catch (error) {
            response.status(500).send(error.message);
        }
    };

    private deleteItem = async (request: Request, response: Response) => {
        try {
            const data = await this.dataService.delete(request.params.id);
            response.status(200).send(`Usunięto ${data}`);
        } catch (error) {
            response.status(500).send(error.message);
        }
    }
}

export default DataController;
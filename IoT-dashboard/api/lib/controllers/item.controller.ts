import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import path from 'path';

class Item
{
    name: string

    constructor(name: string) {
        this.name = name;
    }
}

class ItemController implements Controller {
   public path = '/items';
   public router = Router();
   public items: Item[] = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' }
   ];

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
       this.router.post(this.path, this.createItem);
       this.router.get(this.path, this.getItems);
       this.router.get(`${this.path}/:id`, this.getItemsById);
       this.router.put(`${this.path}/:id`, this.putItems);
       this.router.delete(`${this.path}/:id`, this.deleteItems);
   }

   private serveIndex = async (request: Request, response: Response) => {
       response.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
   }

   private createItem = async (request: Request, response: Response) => {
    const { newName } = request.body;
    this.items.push(new Item(newName));
    response.status(201).send(`Dodano ${newName}`);
   }

   private getItems = async (request: Request, response: Response) => {
    response.send(this.items);
   }

   private getItemsById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const itemId = parseInt(id) - 1
    response.send(this.items[itemId]);
   }

   private putItems = async (request: Request, response: Response) => {
    const { id } = request.params;
    const itemId = parseInt(id) - 1
    const { newName } = request.body;
    this.items[itemId].name = newName
    response.status(201).send(`Obiekt o id ${itemId} zmieniono na: ${newName}`);
   }

   private deleteItems = async (request: Request, response: Response) => {
    const { id } = request.params;
    const itemId = parseInt(id) - 1
    this.items.splice(itemId, 1)
    response.status(201).send(`Usunięto przedmiot ${itemId}`);
   }
}

export default ItemController;
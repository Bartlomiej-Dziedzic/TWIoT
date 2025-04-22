import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import path from 'path';
import { Server } from 'socket.io';

class IndexController implements Controller {
   public path = '/*';
   public router = Router();
   private io: Server;

   constructor(io: Server) {
       this.io = io
       this.initializeRoutes();
   }

   private initializeRoutes() {
       this.router.post('/emit', this.emitReading);
       this.router.get('/', this.serveIndex);

   }

   private emitReading = async (request: Request, response: Response, next: NextFunction) => {
    try {
        this.io.emit("message", 'nowy pomiar');
        response.status(200).json({ res: "ok" });
    } catch (error) {
        console.error("Błąd podczas emisji danych:", error);
        response.status(500).json({ error: "Błąd serwera" });
    }
 };
 

   private serveIndex = async (request: Request, response: Response) => {
       response.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
   }
}

export default IndexController;
//http://localhost:3100/simulate

import Controller from '../interfaces/controller.interface';
import { Request, Response, Router } from 'express';
import { Server } from 'socket.io';

class TemperatureController implements Controller {
  public path = '/temp';
  public router = Router();
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/simulate', this.postTemp);
  }
     
  private postTemp = async (request: Request, response: Response) => {
    try {
      const { temperature, pressure, humidity, deviceId } = request.body;

      if (temperature === undefined || pressure === undefined || humidity === undefined || deviceId === undefined) {
        return response.status(400).json({ error: 'Missing temperature data' });
      }

      this.io.emit('new Temp', { temperature, pressure, humidity, deviceId });
      console.log("Wysłano Dane")
      response.status(200).json({ message: 'OK' });
    } catch (error) {
      console.error('Error:', error);
      response.status(500).json({ error: 'Błąd serwera' });
    }
  };
}

export default TemperatureController;
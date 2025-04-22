import ItemController from './controllers/item.controller'
import DataController from './controllers/data.controller'
import IndexController from './controllers/index.controller';
import App from './app';
import TemperatureController from './controllers/temp.controller';

const app: App = new App([]);
const io = app.getIo();


const controllers = [
   new DataController(),
   new IndexController(io),
   new TemperatureController(io),
];


controllers.forEach((controller) => {
   app.app.use(controller.path, controller.router);
   console.log(controller.path)
});


app.listen();
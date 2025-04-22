import DataModel from '../schema/data.schema';
import { IData } from '../models/data.model';


export default class DataService {

   public async getAll() {
       try {
           const data = await DataModel.find();
           return data;
       } catch (error) {
           throw new Error(`Query failed: ${error}`);
       }
   }

   public async post(data: IData) {
           try {
               const postData:IData = await DataModel.create(data);
               return postData;
           } catch (error) {
               throw new Error(`Query failed: ${error}`);
           }
       }

       public async delete(id: string) {
           try {
               const data = await DataModel.findByIdAndDelete(id);
               return data
           } catch (error) {
               throw new Error(`Query failed: ${error}`);
           }
       }
}
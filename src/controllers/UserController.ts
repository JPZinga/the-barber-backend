
import {Request, Response} from 'express';
import UserModel from '../models/User';
import AdressModel, {IAdress} from '../models/Adress';

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  adress: IAdress['_id'];
  createAt: Date;
}

class UserCntroller {
  
  async index(req: Request, res: Response){
    const users = await UserModel.find();
    return res.json(users);
  }

  async create(req: Request, res: Response){
    
    var receivedData: IUser = req.body;
    
    var createdUser = await UserModel.findOne({email: receivedData.email});
    
    if (!createdUser){
      receivedData.adress = await AdressModel.create(receivedData.adress);
      createdUser = await UserModel.create(receivedData);
    }

    return res.json(createdUser);
  }
}

export default UserCntroller;
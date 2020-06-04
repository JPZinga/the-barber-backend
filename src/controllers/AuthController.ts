
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { IUser } from '../models/User';
import User from '../models/User';

import authConfig from '../config/auth';

class AuthController {

  async authenticate(req: Request, res: Response){
    
    const receivedData: IUser = req.body;

    var user = await User.findOne({email: receivedData.email}).populate('adress').select('+password');

    if (!user)
      return res.status(400).send({'error': 'User not found!'})

    if (!await bcrypt.compare(receivedData.password, user.password))
      return res.status(400).send({'error': 'Invalid Password!'})
    
    user.password = undefined;

    const token = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: "1d",
    });

    return res.json({token, user});
  }
};

export default AuthController;

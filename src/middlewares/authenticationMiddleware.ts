
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader: string | any = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({"error": "No token provided"});
  
  const parts = authHeader.split(' ');

  if (parts.length != 2)
    return res.status(401).send({"error": "Token error"});
  
  const [ shema, token ] = parts; 
  
  if (!/^Bearer$/i.test(shema) || token.length === 0 )
    return res.status(401).send({"error": "Token malformated"});
  
  jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
    if ( err )
      return res.status(401).send({"error": "Token Invalid"});

    req.body.userId = decoded.id;

    return next();
  })
  
}

export default authenticationMiddleware;
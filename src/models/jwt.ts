
import * as jwt from 'jsonwebtoken';

export class Jwt {
  secretKey: string = process.env.SECRET_KEY;

  sign(payload: any) {
    let token = jwt.sign(payload, this.secretKey, {
      expiresIn: '3h'
    });

    return token;
  }

  verify(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secretKey, (error, decoded) => {
        if(error) reject(error);
        else resolve(decoded);
      })
    })
  }

}
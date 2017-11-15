
import * as express from 'express';
const router = express.Router();
import * as crypto from 'crypto';

import { UserModel } from './../models/user';

const userModel = new UserModel();

// localhost:8080/api/users
router.get('/users', async(req, res, next) => {

  try {
    let rs = await userModel.getUsers(req.db);
    res.send({ok: true, rows: rs});
  } catch (error) {
    res.send({ok:false, error: error.message});
  }
 
})

// localhost:8080/api/users
router.post('/users', async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let isActive = req.body.isActive;
  let userTypeId = req.body.userType;

  if (username && password && firstName && lastName) {
    let encPassword = crypto.createHash('md5').update(password).digest('hex');

    let user = {
      username: username,
      password: encPassword,
      first_name: firstName,
      last_name: lastName,
      is_active: isActive,
      user_type_id: userTypeId
    }

    await userModel.saveUser(req.db, user);
    res.send({ok: true});

  } else {
    res.send({ok: false, error: 'ข้อมูลไม่ครบถ้วน'})
  }

});

// localhost:8080/api/users/xx
router.put('/users/:userId', async (req, res, next) => {
  let userId = req.params.userId;
  
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let isActive = req.body.isActive;
  let userTypeId = req.body.userType;

  if (userId && firstName && lastName) {

    let user: any = {
      first_name: firstName,
      last_name: lastName,
      is_active: isActive,
      user_type_id: userTypeId
    }

    if (password) {
      let encPassword = crypto.createHash('md5').update(password).digest('hex');
      user.password = encPassword;
    }

    await userModel.updateUser(req.db, userId, user);
    res.send({ok: true})
  } else {
    res.send({ok: false, error: 'ข้อมูลไม่ครบถ้วน'})
  }

});

export default router;
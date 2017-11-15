
import * as express from 'express';
const router = express.Router();

import { UserModel } from '../models/user';
import * as crypto from 'crypto';
import { userInfo } from 'os';

import { Jwt } from '../models/jwt';

const jwt = new Jwt();
const userModel = new UserModel();

router.get('/', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login')
  });
});

router.post('/', async (req, res, next) => {

  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    let encPassword = crypto.createHash('md5').update(password).digest('hex');
    let rs = await userModel.doLogin(req.db, username, encPassword);

    if (rs.length) {
      req.session.logged = true;
      req.session.fullname = rs[0].fullname;

      res.redirect('/');
    } else {
      req.session.error = 'ชื่อผู้ใช้งาน/รหัสผ่านไม่ถูกต้อง';
      res.render('login', { title: 'Login' })
    }
  } else {
    req.session.error = 'ข้อมูลไม่ครบถ้วน';
    res.render('login', { title: 'Login' })
  }
});

router.post('/auth', async (req, res, next) => {

  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    let encPassword = crypto.createHash('md5').update(password).digest('hex');
    let rs = await userModel.doLogin(req.db, username, encPassword);

    if (rs.length) {
      let fullname = rs[0].fullname;
      let token = jwt.sign({fullname: fullname});
      res.send({ok: true, token: token})
    } else {
      res.send({ok: false, error: 'ชื่อผู้ใช้งาน/รหัสผ่าน ไม่ถูกต้อง'})
    }
  } else {
    res.send({ok: false, error: 'ข้อมูลไม่ครบถ้วน'})
  }
});


export default router;
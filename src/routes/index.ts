'use strict';

import * as express from 'express';
const router = express.Router();
import * as crypto from 'crypto';

import { UserModel, UserTypeModel as UserType } from '../models/user';
const userModel = new UserModel();
const userTypeModel = new UserType();

// async/await

router.get('/test', async (req, res, next) => {

  const db = req.db;
  // let sql = 'SELECT * FROM users WHERE user_type_id=?';

  try {
    let rs = await db('users as u') // SELECT * FROM users
      // .where('u.user_id', 1)
      .leftJoin('user_types as ut', 'ut.user_type_id', 'u.user_type_id')
      .select('u.username', 'ut.user_type_name');

    let rs2 = await db('user_types');
    res.send({ rows: rs, types: rs2 });

  } catch (error) {
    res.send({ error: error.message })
  } finally {
    // db.destroy();
  }

});

router.get('/', async (req, res, next) => {
  let rs = await userModel.getUsers(req.db);
  res.render('index', { title: 'Index', users: rs });
});

router.get('/new', async (req, res, next) => {
  let rs = await userTypeModel.getUserTypeList(req.db);
  res.render('new', { title: 'New user', types: rs });
});

router.get('/edit/:userId', async (req, res, next) => {
  let rs = await userTypeModel.getUserTypeList(req.db);
  let user = await userModel.getDetail(req.db, req.params.userId);

  res.render('edit', { title: 'Edit user', types: rs, user: user[0] });
});

router.post('/add', async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let isActive = req.body.isActive ? 'Y' : 'N';
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
    res.redirect('/');
  } else {
    let rs = await userTypeModel.getUserTypeList(req.db);
    res.render('new', { 
      title: 'New user', 
      types: rs,
      error: 'ข้อมูลไม่ครบ', 
      username: username,
      firstName: firstName,
      lastName: lastName });
  }

});

router.post('/update', async (req, res, next) => {
  let userId = req.body.userId;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let isActive = req.body.isActive ? 'Y' : 'N';
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
    res.redirect('/');
  } else {
    res.redirect('/edit/' + userId);
  }

});

router.get('/search', async (req, res, next) => {
  let query = req.query.q;
  let rs = await userModel.search(req.db, query);
  res.render('index', { title: 'Search', users: rs });
});

router.get('/remove/:userId', async (req, res, next) => {
  let userId = req.params.userId;
  await userModel.removeUser(req.db, userId);
  res.redirect('/');
})

router.get('/user-types', async (req, res, next) => {
  let userId = req.params.userId;
  let rs = await userModel.getUserTypeList(req.db);
  res.send(rs)
})

router.get('/hello/world', (req, res, next) => {
  let fruits = ['Apple', 'Banana', 'Orange']
  let cars = [
    { brand: 'Toyota', model: 'Revo' },
    { brand: 'Honda', model: 'Civic' },
  ];
  res.render('hello', {
    title: 'Express.js',
    fruits: fruits,
    cars: cars
  });
});
// localhost:3000/hi/xxxxx
router.get('/hi/:name/:age', (req, res, next) => {
  let name = req.params.name;
  let age = req.params.age;

  res.send({ name: name, age: age });
})

router.post('/hi', (req, res, next) => {
  let name = req.body.name;
  let age = req.body.age;

  res.send({ name: name, age: age });
})

// ums routing



export default router;
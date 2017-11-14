'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const user_1 = require("../models/user");
const userModel = new user_1.UserModel();
const userTypeModel = new user_1.UserTypeModel();
router.get('/test', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const db = req.db;
    try {
        let rs = yield db('users as u')
            .leftJoin('user_types as ut', 'ut.user_type_id', 'u.user_type_id')
            .select('u.username', 'ut.user_type_name');
        let rs2 = yield db('user_types');
        res.send({ rows: rs, types: rs2 });
    }
    catch (error) {
        res.send({ error: error.message });
    }
    finally {
    }
}));
router.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let rs = yield userModel.getUsers(req.db);
    res.render('index', { title: 'Index', users: rs });
}));
router.get('/new', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let rs = yield userTypeModel.getUserTypeList(req.db);
    res.render('new', { title: 'New user', types: rs });
}));
router.post('/add', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
        };
        yield userModel.saveUser(req.db, user);
        res.redirect('/');
    }
    else {
        let rs = yield userTypeModel.getUserTypeList(req.db);
        res.render('new', { title: 'New user', types: rs, error: 'ข้อมูลไม่ครบ' });
    }
}));
router.get('/search', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let query = req.query.q;
    let rs = yield userModel.search(req.db, query);
    res.render('index', { title: 'Search', users: rs });
}));
router.get('/remove/:userId', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let userId = req.params.userId;
    yield userModel.removeUser(req.db, userId);
    res.redirect('/');
}));
router.get('/user-types', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let userId = req.params.userId;
    let rs = yield userModel.getUserTypeList(req.db);
    res.send(rs);
}));
router.get('/hello/world', (req, res, next) => {
    let fruits = ['Apple', 'Banana', 'Orange'];
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
router.get('/hi/:name/:age', (req, res, next) => {
    let name = req.params.name;
    let age = req.params.age;
    res.send({ name: name, age: age });
});
router.post('/hi', (req, res, next) => {
    let name = req.body.name;
    let age = req.body.age;
    res.send({ name: name, age: age });
});
exports.default = router;
//# sourceMappingURL=index.js.map
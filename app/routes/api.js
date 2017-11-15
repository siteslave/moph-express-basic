"use strict";
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
const user_1 = require("./../models/user");
const userModel = new user_1.UserModel();
router.get('/users', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let rs = yield userModel.getUsers(req.db);
        res.send({ ok: true, rows: rs });
    }
    catch (error) {
        res.send({ ok: false, error: error.message });
    }
}));
router.post('/users', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
        };
        yield userModel.saveUser(req.db, user);
        res.send({ ok: true });
    }
    else {
        res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
    }
}));
router.put('/users/:userId', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let userId = req.params.userId;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let isActive = req.body.isActive;
    let userTypeId = req.body.userType;
    if (userId && firstName && lastName) {
        let user = {
            first_name: firstName,
            last_name: lastName,
            is_active: isActive,
            user_type_id: userTypeId
        };
        if (password) {
            let encPassword = crypto.createHash('md5').update(password).digest('hex');
            user.password = encPassword;
        }
        yield userModel.updateUser(req.db, userId, user);
        res.send({ ok: true });
    }
    else {
        res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
    }
}));
exports.default = router;
//# sourceMappingURL=api.js.map
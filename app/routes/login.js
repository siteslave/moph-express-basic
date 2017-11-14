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
const user_1 = require("../models/user");
const crypto = require("crypto");
const userModel = new user_1.UserModel();
router.get('/', (req, res, next) => {
    res.render('login', { title: 'Login' });
});
router.get('/logout', (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});
router.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        let encPassword = crypto.createHash('md5').update(password).digest('hex');
        let rs = yield userModel.doLogin(req.db, username, encPassword);
        if (rs.length) {
            req.session.logged = true;
            req.session.fullname = rs[0].fullname;
            res.redirect('/');
        }
        else {
            req.session.error = 'ชื่อผู้ใช้งาน/รหัสผ่านไม่ถูกต้อง';
            res.render('login', { title: 'Login' });
        }
    }
    else {
        req.session.error = 'ข้อมูลไม่ครบถ้วน';
        res.render('login', { title: 'Login' });
    }
}));
exports.default = router;
//# sourceMappingURL=login.js.map
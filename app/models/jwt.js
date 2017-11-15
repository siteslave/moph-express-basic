"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
class Jwt {
    constructor() {
        this.secretKey = '12345678995444850022200520';
    }
    sign(payload) {
        let token = jwt.sign(payload, this.secretKey, {
            expiresIn: '3h'
        });
        return token;
    }
    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretKey, (error, decoded) => {
                if (error)
                    reject(error);
                else
                    resolve(decoded);
            });
        });
    }
}
exports.Jwt = Jwt;
//# sourceMappingURL=jwt.js.map
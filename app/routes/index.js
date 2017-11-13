'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});
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
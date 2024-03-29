const express = require('express');
const reportController = require('../controllers/report/report.controller');
const authuser = require('../middleware/auth.middle');
const getallreport = require('../controllers/report/getallreport.controller');
const deleteController = require('../controllers/report/deletereport.controller');
const route = express.Router();

route.post('/',authuser,reportController).get('/',authuser,getallreport).delete('/:id',authuser,deleteController)

module.exports = route;
'use strict'

import express  from "express"

const route = express.Router();

import users from '../components/users/network.js';
route.use('/users', users);


import counts from '../components/counts/network.js';
route.use('/counts', counts);


export default route
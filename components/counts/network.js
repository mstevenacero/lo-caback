import express from 'express';
const route = express.Router();

import verification from '../../middleware/middleware.js';
import controller from './controller.js'

route.post('/', controller.add )
route.post('/addbalance',verification,controller.addBalance)
route.post('/sustract',verification,controller.subtractBalance)
route.get('/', controller.list)
route.get('/:number_count',controller.getOne)



export default route
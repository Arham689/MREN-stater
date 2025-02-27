import express, { Router } from 'express'
import Table from '../models/table.model.js';
import { deleteData , getData , postData , updateData  } from '../controllers/crud.controller.js';
const route = express.Router();

route.get('/crud', getData )

route.post('/crud', postData )

route.put('/crud/:id',updateData )

route.delete('/crud/:id', deleteData )

export default route;
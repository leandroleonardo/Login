import express from 'express';
const router = express.Router();
import auth from '../controllers/authController.js' 
import adminController from '../controllers/adminController.js'

let admin = { index:'admin.html' }

router.use('/', express.static('public',admin))
router.post('/', auth, adminController.logado)

export default router
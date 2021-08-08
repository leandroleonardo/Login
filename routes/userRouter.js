import express from 'express'
import userController from '../controllers/userController.js'
import auth from '../controllers/authController.js'
import path from 'path'
const router = express.Router()

const options = {
    loginPage: { index:'index.html'} ,
    registrationPage: { index:'register.html'},
    homePage: { index:'pag.html'},
}

let __dirname = path.resolve()
__dirname = path.join(__dirname ,'public')

/* home page  */
router.use('/home', express.static(__dirname, options.homePage))
router.post('/home', auth, (req,res)=>{ res.json(req.user.name) })

/* login */
router.use('/login',express.static(__dirname,options.loginPage))
router.post('/login',userController.login)

/* register */ 
router.use('/register',express.static(__dirname, options.registrationPage))
router.post('/register',userController.register)


export default router
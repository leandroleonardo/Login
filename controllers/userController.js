import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerValidate , loginValidate } from '../controllers/validate.js'

export default {
    
    register: async (req,res)=>{
        
        const {error} = registerValidate(req.body)
        if(error) {

            if(req.body.name.length < 3)
                return res.status(400).json('Nome precisa conter no mínimo três caracteres')
            if(req.body.password.length < 6)
                return res.status(400).json('Senha precisa conter no mínimo seis caracteres')
            else
                return res.status(400).json('Email inválido')
        }

        const selectedUser = await User.findOne({email:req.body.email})
        if(selectedUser) return res.status(400).json('Email já cadastrado')

        const salt = bcrypt.genSaltSync(10)

        const user = new User({
            name: req.body.name,salt,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,salt)
        })

        try {
            const savedUser = await user.save()
            res.status(200).json('Cadastrado')
        }catch(error){
            res.status(400).json('Erro no cadastro')
        }
    },

    login: async (req,res)=>{

        const {error} = loginValidate(req.body)
        if(error) return res.status(401).json('Credenciais inválidas')

        const selectedUser = await User.findOne({email:req.body.email})
        if(!selectedUser) return res.status(401).json('Credenciais inválidas')

        const passwordAndUserMatch = await bcrypt.compare(req.body.password, selectedUser.password)
        if(!passwordAndUserMatch) return res.status(401).json('Credenciais inválidas')
         
        let name = await selectedUser.name

        const token = jwt.sign({
            name:selectedUser.name,
            id:selectedUser.id, 
            admin:selectedUser.admin
        }, 
            process.env.TOKEN_SECRET
        )
        
        res.header('authorization-token',token)
        res.status(200).json(token)
    }

}
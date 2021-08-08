export default {
    logado: (req,res)=>{
        if(req.user.admin) 
            res.json('Admin')
        else     
            res.status(401).json('Acesso negado')
    }
}
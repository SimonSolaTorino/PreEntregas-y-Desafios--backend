export const auth = (req, resp, next)=>{
    if(req.session?.userio){
        return next()
    }
    else{
        return resp.redirect('/now/login')
    }
}
export const admin = (req, resp, next)=>{
    console.log(req.session.rol)
    if(req.session?.rol === 'admin'){
        return next()
    }
    else{
        return resp.redirect('/now/login')
    }
}
export const auth = (req, resp, next)=>{
    if(req.session?.user){
        return next()
    }
    else{
        return resp.redirect('/now/login')
    }
}
export const admin = (req, resp, next)=>{
    if(req.session?.rol === 'admin'){
        return next()
    }
    else{
        return resp.redirect('/now/login')
    }
}
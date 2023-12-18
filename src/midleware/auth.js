export const auth = (req, resp, next)=>{
    if(req.session?.user){
        return next()
    }
    else{
        return resp.redirect('/now/login')
    }
}

export const main_view =  async (req, resp)=>{
    const user = req.session.user
    return resp.render('home', {user})
}

export const socket_realtime = async (req, resp)=>{
    const user = req.session.user
    return resp.render('realTimeProducts', {user})
}
export const socket_chat = async (req, resp)=>{
    const user = req.session.user
    return resp.render('chat', {user})
}

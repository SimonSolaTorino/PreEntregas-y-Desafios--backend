import bycrypt from "bcrypt";

export const crear_hash = (contraseña)=>{
    const saltos = bycrypt.genSaltSync(10)
    const contraseña_hasheada = bycrypt.hashSync(contraseña, saltos)

    console.log(contraseña_hasheada, contraseña)

    return contraseña_hasheada
}

export const contraseña_valida = (contraseña, contraseña_DB)=>{
    const contraseña_valida = bycrypt.compareSync(contraseña, contraseña_DB)

    return contraseña_valida
}
const Veterinary = require("../../models/veterinaries")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function vetRegister(user, name, password){
    const hashedPassword = await hashPasword(password).catch((error) => {
        console.log(error)
        throw new Error(`Error hasheando la contraseña. ${error}`)
    })
    const token = createToken(user, name)
    const veterinary = await Veterinary.create({
        user,
        name,
        password: hashedPassword,
        token
    }).catch((error)=>{
        console.log(error.code)
        throw error
    })
    return {user, name, token}
}

async function hashPasword(password){
    return await bcrypt.hash(password, 5)
}

async function verifyHashedPassword(password, storedPassword){
    return await bcrypt.compare(password, storedPassword)
}

function createToken(user, name) {
    const token = jwt.sign({user, name}, process.env.SIGN_PASSWORD)
    return token
}

async function vetLogin(user, password){
    const veterinary = await Veterinary.findOne({user}).catch((error) => {
        console.log(error)
        throw new Error(`Error encontrando al usuario. ${error}`)
    })
    const passwordMatch = await verifyHashedPassword(password, veterinary.password)
    if(passwordMatch === false){
        throw new Error(`Error: Contraseña incorrecta`)
    }
    const token = createToken(user, veterinary.name)
    veterinary.token = token
    await veterinary.save().catch ((error) => {
        console.log(error)
        throw new Error(`Error guardando nuevo token. ${error}`)
    })
    return {user, name: veterinary.name, token}
}

module.exports = {vetRegister, verifyHashedPassword, vetLogin}
const express = require("express")
const router = new express.Router()
const { vetRegister, vetLogin } = require("./utils")

//Registro
router.post("/veterinary/register", async (req, res)=>{
    try{
        const request = req.body
        console.log("/veterinary/register", request)
        const newUser = await vetRegister(
            request.user,
            request.name,
            request.password
        )
        res.status(200).send({
            status: true,
            message: "Usuario registrado con éxito",
            data: {
                user: newUser.user,
                name: newUser.name,
                token: newUser.token
            }
        })
    }catch (error){
        let msg = ""
        console.log(error.code)
        switch(error.code){
            case 11000:
                msg = "El usuario ya existe"
                break
        }
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: msg,
            data: {error: error.toString()}
        })
    }
})

//Logueo
router.post("/veterinary/login", async (req, res)=>{
    try {
        const request = req.body
        console.log("/veterinary/login", request)
        const loggedUser = await vetLogin(
            request.user,
            request.password
        )
        res.status(200).send({
            status: true,
            message: "Usuario logueado con éxito",
            data: {
                veterinary: loggedUser
            }
        })
    } catch (error) {
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Ingreso fallido",
            data: {error: error.toString()}
        })
    }
})

module.exports = router
const express = require("express")
const {authenticate} = require("../../middleware/auth")
const router = new express.Router()
const { createDate, queryAppointment, cancelAppointment } = require("./utils")

//Crear cita
router.post("/date/new-date", async (req, res)=>{
    try{
        const request = req.body
        console.log("/date/new-date", request)
        const newdate = await createDate(
            request.senderName,
            request.senderDni,
            request.petName,
            request.dateRequest,
            request.typeRequest,
            request.description
        )
        res.status(200).send({
            status: true,
            message: "Creación de cita exitosa",
            data: {
                dates: newdate
            }
        })
    }catch (error){
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Creación de cita falló",
            data: {error: error.toString()}
        })
    }
})

//consulta de citas
router.get("/date/all", authenticate, async (req, res)=>{
    try{
        const request = req.body
        console.log("/date/all", request)
        const queriedAppointments= await queryAppointment()
        res.status(200).send({
            status: true,
            message: "Citas consultadas con éxito",
            data: {date: queriedAppointments}
        })
    }catch (error){
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Falla al consultar citas",
            data: {error: error.toString()}
        })
    }
})

//cancelar citas
router.patch("/date/cancel-date", async (req, res)=>{
    try{
        const request = req.body
        console.log("/date/cancel-date", request)
        const canceledAppointment = await cancelAppointment(
            request.idRequest
        )
        res.status(200).send({
            status: true,
            message: "Cita cancelada con éxito",
            data: {date: canceledAppointment}
        })
    }catch (error){
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Falla al cancelar cita",
            data: {error: error.toString()}
        })
    }
})

module.exports = router
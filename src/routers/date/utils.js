const Appointment = require("../../models/dates")
const { v4 } = require("uuid")

async function createDate(name, dni, petName, dateRequest, typeRequest, description){
    const petDate = await Appointment.create({
        senderName: name,
        senderDni: dni,
        petName: petName,
        dateRequest: dateRequest,
        idRequest: v4(),
        typeRequest: typeRequest,
        description: description
    }).catch((error)=>{
        console.log(error)
        throw new Error(`Error al crear cita. ${error}`)
    })
    return petDate
}

async function queryAppointment() {
    const appointments = await Appointment.find({}).catch((error) => {
        console.log(error)
        throw new Error(`Error encontrando las citas. ${error}`)
    })
    console.log("CITAS", appointments)
    if (appointments == null || appointments.length <= 0) {
        throw new Error("Error: no se encontro ninguna cita")
    }
    return appointments
}

async function cancelAppointment(idRequest, newStatus){
    const appointment = await Appointment.findOne({idRequest}).catch ((error) => {
        console.log(error)
        throw new Error(`Error encontrando la cita. ${error}`)
    })
    if(appointment.statusRequest != 'Reservado'){
        throw new Error(`Sólo puedes cancelar citas en estado "Reservado"`)
    }
    const changeStatus = newStatus
    if(newStatus != 'Cancelado'){
        throw new Error(`Sólo puedes cambiar tu cita a Cancelado`)
    }
    if(appointment != null){
        appointment.statusRequest = newStatus
    }
    appointment.save()
    return appointment
}

module.exports = {createDate, queryAppointment, cancelAppointment}
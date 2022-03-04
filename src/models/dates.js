const mongoose = require("mongoose")
const { required } = require("nodemon/lib/config")

const appointmentSchema = new mongoose.Schema(
    {
    senderName:{
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 50,
    },
    senderDni:{
        type: Number,
        required: true,
        trim: true
    },
    petName:{
        type: String,
        trim: true
    },
    dateRequest:{
      type: Date,
      required: true  
    },
    idRequest:{
        type: String,
        required: true
    },
    typeRequest:{
        type: String,
        enum:['Chequeo', 'Desparasitación y vacunación', 'Urgencias'],
        default: 'Chequeo',
        required: true
    },
    description:{
        type: String,
        required: true
    },
    statusRequest:{
        type: String,
        enum:['Reservado', 'Cancelado', 'Activo', 'Completado'],
        default: 'Reservado'
    }
},
{
    timestamps: true
}
)

const Appointment = mongoose.model("Appointment", appointmentSchema)
module.exports = Appointment
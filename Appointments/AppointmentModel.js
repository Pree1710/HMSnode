import mongoose from 'mongoose';
const AppointmentSchema = mongoose.Schema(
    {
        
        doctor:{
            type : mongoose.Schema.Types.ObjectId,
            ref: 'DoctorModel'
        },
        Patient:{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'PatientModel'
        },
        appointment_date:{
            type: Date,
            required : true
        },
        appointment_slot:{
            type: String,
            required : true
        }
    },
    {
        timestamps:true
    }
)

export const AppointmentModel = mongoose.model('AppointmentModel',AppointmentSchema )
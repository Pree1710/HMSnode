import express, { request, response } from 'express'
import { DoctorModel } from '../Doctors/DoctorModel.js'
import { PatientModel } from '../Patients/PatientModel.js'
import { AppointmentModel } from './AppointmentModel.js'

const AppointmentRouter = express.Router()

AppointmentRouter.get('/:id/', async(request , response) => {
    
    const {id} = request.params

    const final_array =[]
   
    const appointment_info = await AppointmentModel.find({doctor:id})

    for(let app of appointment_info){
        const patientdetails = await PatientModel.findById(app.Patient)
        console.log(patientdetails);
        
        const final_data = {

            patientName : patientdetails.patient_name,
            date : app.appointment_date,
            slot : app.appointment_slot
        }
           
        final_array.push(final_data)

    }
    response.json(final_array)
    
})

AppointmentRouter.get('/', async(request , response) =>{    
    
    const get_app = await AppointmentModel.find({})
    response.json(get_app)

})

        
AppointmentRouter.post('/', async(request , response) => {

    const patient_info = AppointmentModel(request.body)
    await patient_info.save()
    response.send("added")
})


AppointmentRouter.patch('/:id/', async(request , response) => {

    const {id} = request.params
    await AppointmentModel.findByIdAndUpdate(id, request.body)
    response.json("updated")

})

AppointmentRouter.delete('/:id/', async(request , response) => {
    
    const {id} = request.params
    const patient_doc = AppointmentModel(request.body)
    await AppointmentModel.findByIdAndDelete(id , request.body)
    response.json("deleted")

})

// AppointmentRouter.get("/patientid/:id/", async(request, response) => {
//     const {id} = request.params

//     const patient = {}
//     const patientArr = []
//     const patientDetails = await PatientModel.findById(id)
//     console.log(patientDetails)
//     patient.name = patientDetails.patient_name
//     patientArr.push(patient)
//     response.json(patientArr)
// })



// AppointmentRouter.get('/', async(request , response) =>{
    
//     const get_appointments = await AppointmentModel.find({})
//     const all_appointments = []

//     for(let appointment of get_appointments){

//         const doctor_data  = DoctorModel.find({doctor:appointment.doctor})
//         const patient_data = PatientModel.find({patient:appointment.patient})

//         const appointment_data = [            

//             appointment.appointment_date,
//             appointment.appointment_slot,
//             doctor_data,
//             patient_data

//         ]
//         all_appointments.push(appointment_data)

//     }

//     response.json(all_appointments)
    
// })

// AppointmentRouter.get('/:id/' , async(request , response) => {

//     const {id} = request.params
//     const appointment = []
//     const get_appointment = await AppointmentModel.findById(id)
//     const doctor_data = DoctorModel.find({doctor:get_appointment.doctor})
//     const patient_data = PatientModel.find({patient:get_appointment.patient})
//     const appointment_data = [

//             appointment.appointment_date,
//             appointment.appointment_slot,
//             doctor_data,
//             patient_data

//     ]
//         appointment.push(appointment_data)

//             response.json(appointment)

// })
export default AppointmentRouter
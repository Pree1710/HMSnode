import express ,{ json,urlencoded } from 'express'
import { config } from 'dotenv'
import {connect, set} from 'mongoose'
import cors from 'cors'
import PatientRouter from './Patients/PatientRouter.js'
import DoctorRouter from './Doctors/DoctorRouter.js'
import DepartmentRouter from './Departments/DepartmentRouter.js'
import PrescriptionRouter from './Prescription/PrescriptionRouter.js'
import BillingRouter from './Billing/BillingRouter.js'
import AppointmentRouter from './Appointments/AppointmentRouter.js'
import AdminRouter from './Admin/AdminRouter.js'

const app = express()
console.log("hi");
app.use(json())
app.use(urlencoded({extended: true}))
config()
set('strictQuery', false)
const PORT = process.env.PORT
const mangodb_connection = process.env.connection_string
app.use(cors({
    origin : 'http://localhost:5173',
    methods: ['GET' , 'POST', 'PATCH' ,'DELETE'],
    allowedHeaders :['Content-Type']
}))

app.use('/patient/',PatientRouter)
app.use('/doctor/', DoctorRouter)
app.use('/department/', DepartmentRouter)
app.use('/prescription/',PrescriptionRouter)
app.use('/billing/' , BillingRouter)
app.use('/appointments/', AppointmentRouter )
app.use("/admin/",AdminRouter)


//app.use(cors())




const start = async() => {
    await connect(`${mangodb_connection}`)
    app.listen(PORT, () => console.log("server is running "))
}
start()


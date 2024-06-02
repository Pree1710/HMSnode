import express, { request } from 'express'
import { AdminModel } from './AdminModel.js'
import { RefreshToken } from './AdminModel.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { newAccessToken } from './authentication.js'
const AdminRouter = express.Router()
 AdminRouter.get('/', async(request , response) =>{    
    
    const get_admin = await AdminModel.find({})
    response.json(get_admin)

})
 
 AdminRouter.post('/', async(request , response) => {

    const admin_info = AdminModel(request.body)
    await admin_info.save()
    response.send("added")

})
 AdminRouter.patch('/:id/', async(request , response) => {

    const {id} = request.params
    await AdminModel.findByIdAndUpdate(id, request.body)
    response.json("updated")

})

AdminRouter.delete('/:id/', async(request , response) => {

    const {id} = request.params
    await AdminModel.findByIdAndDelete(id , request.body)
    response.json("deleted")

})


AdminRouter.get('/generatekey/', async (request , response) =>{
     
    const key = crypto.randomBytes(64).toString('hex')

    response.json(key)

})

AdminRouter.post('/validate/' ,async (request , response) =>{
     
    const {username,password } = request.body

    console.log(username,password);

    const admin_details = await AdminModel.find({})

    const admin_check = admin_details.find((admin) => admin.admin_name === username)
    console.log(admin_check);

    if (admin_check === undefined) response.json({
        status: false,
        message: "Invalid Username"
    })
    else{
        if (admin_check.password === password) {
            console.log("valid user");
            const user = {
                name : username
            }

            const access_token = newAccessToken(user)
            const refresh_token = jwt.sign(user , process.env.refresh_token_key)

            const new_refresh_token = new RefreshToken({
                refresh_token: refresh_token
            })

            await new_refresh_token.save()

            response.json({
            status: true,
            message: "Valid User",
            access_token : access_token,
            refresh_token: refresh_token,
            user_data : admin_check

        })
        }
        else response.json({
            status: false,
            message: "Invalid Password"
        })
    }
})

AdminRouter.post('/token/' , async (request , response) =>{

    const refresh_token = request.body.refresh_token

    if (refresh_token === null){
       return response.status(401).json("No Token Found")
    }

    const all_refresh_tokens = await RefreshToken.find({refresh_token:refresh_token})

    if (all_refresh_tokens.length === 0){
        return response.status(403).json("Invalid Token")
    }

    jwt.verify(refresh_token , process.env.refresh_token_key ,(error, user)=>{
        if(error){
            return response.status(403).json("Token Verification Failed")
        }

        const access_token = newAccessToken({name : user.name})

    response.json({

        access_token:access_token,
      
    })

})
    })

AdminRouter.post('/logout/' , async (request , response) =>{
    
    const refresh_token = request.body.refresh_token

    const all_refresh_tokens = await RefreshToken.find({})

    let selected_token = all_refresh_tokens.find(token => token.refresh_token === refresh_token)

     await RefreshToken.findByIdAndDelete(selected_token._id)
    
    

    response.status(200).json("Refresh Token Deleted")



} )    




export default AdminRouter
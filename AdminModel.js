import mongoose from 'mongoose';
const AdminSchema = mongoose.Schema(
    {
        admin_name:{
            type: String,
            required : true
        },
        password:{
            type: String,
            required : true
        }
    },
    {
        timestamps:true
    }
)

const RefreshTokenSchema = mongoose.Schema(
    {
        refresh_token:{
            type : String,
            required : true
        }
    }
)
export const RefreshToken = mongoose.model( 'RefreshToken' , RefreshTokenSchema)

export const AdminModel = mongoose.model('AdminModel',AdminSchema)
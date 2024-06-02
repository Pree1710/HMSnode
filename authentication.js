import jwt from 'jsonwebtoken'
import {config} from 'dotenv'

config()

export const newAccessToken = user =>{
    return jwt.sign(user , process.env.access_token_key,
      {expiresIn:'30s'})
    
}
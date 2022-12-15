// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { user_schema } from '../../schema/users/userSchema.js';

// customer collection(or model)
const User = new mongoose.model("user", user_schema);

const updateUser = (req, res) => {
    // Geting values from forntend
    const { update } = req.body

    User.findByIdAndUpdate(
        { _id : update.userId},
        {
            $set: { 
                fullName: update.fullName,
                email: update.email,
                password: update.password,
                confirmPassword: update.confirmPassword,
                phoneNumber: update.phoneNumber,
                role: update.role,
            }
        },
        (err, list) => {
            if(err){
                console.log(err)
            }else{
                if(list){
                    return res.send({
                        message : "user updated"
                    })
                }
            }
        }
        )
}

export default updateUser;
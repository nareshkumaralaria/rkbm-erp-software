// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { user_schema } from '../../schema/users/userSchema.js';

// customer collection(or model)
const User = new mongoose.model("user", user_schema);

const deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        const user = await User.deleteOne({ "_id" : id })
        if(user){
            return res.send({
                message : "deleted"
            })
        }else{
            console.log("err")
        }
    } catch (error) {
        console.log(error);
    }
}

export default deleteUser;
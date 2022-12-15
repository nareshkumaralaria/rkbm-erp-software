// mongoose importing
import mongoose from 'mongoose'

// customer_schema importing
import { user_schema } from '../../schema/users/userSchema.js';

// customer collection(or model)
const User = new mongoose.model("user", user_schema);

const getUserData = async (req, res) => {
    try {
        const user = await User.find({})
        return res.send(user);
    } catch (error) {
        console.log(error);
    }
}

export default getUserData;
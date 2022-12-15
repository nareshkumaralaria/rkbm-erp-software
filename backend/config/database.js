import mongoose from 'mongoose'

// mongoose.connect('mongodb://localhost:27017/rkbm', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("DB Connected")
// });

mongoose.connect(`mongodb+srv://${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}@rkbmcluster.7rik0.mongodb.net/rkbm?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB Connected")
});

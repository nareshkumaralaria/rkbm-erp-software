import Bills from '../../schema/bills/billsSchema.js'

const getBills = async (req, res) => {
    try {
        const bills = await Bills.find({})
        return res.send(bills);
    } catch (error) {
        console.log(error)
    }
}

export default getBills;
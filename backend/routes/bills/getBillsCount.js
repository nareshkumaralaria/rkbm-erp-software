import Bills from '../../schema/bills/billsSchema.js'

const getBillsCount = async (req, res) => {
    try {
        const bills = await Bills.find({});
        const billsCount = bills.length;
        return res.send({ billsCount: billsCount });
    } catch (error) {
        console.log(error)
    }
}

export default getBillsCount;
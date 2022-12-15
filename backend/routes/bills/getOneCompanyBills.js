import Bills from '../../schema/bills/billsSchema.js'

const getOneCompanyBills = async (req, res) => {
    const { formValues } = req.body;
    try {
        const bills = await Bills.find({ companyName: formValues.companyName })
        return res.send(bills);
    } catch (error) {
        console.log(error)
    }
}

export default getOneCompanyBills;
import Bills from '../../schema/bills/billsSchema.js'

const addBill = async (req, res) => {
    const { billDetails } = req.body;

    try {
        // Creating bill document
        const bill = new Bills({
            startDate: billDetails.startDate,
            endDate: billDetails.endDate,
            invoiceNumber: billDetails.invoiceNumber,
            invoiceDate: billDetails.invoiceDate,
            companyName: billDetails.companyName,
            companyAddress: billDetails.companyAddress,
            gstNumber: billDetails.gstNumber,
            billValues: billDetails.billValues,
            gstType: billDetails.gstType,
            paymentType: billDetails.paymentType,

        });
        // Saving bill on DB(back-End)
        await bill.save();
        return res.send({
            message: "Bill Generated successfully",
        });
    } catch (error) {
        return res.send({
            // message: error.message,
            message: "SERVER ERROR!!",
        });
    }
};

export default addBill;

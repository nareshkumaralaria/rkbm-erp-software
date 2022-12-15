import Bills from '../../schema/bills/billsSchema.js'

const updateBillDate = async (req, res) => {
    const { billDetails } = req.body;

    Bills.findByIdAndUpdate(
        { _id: billDetails._id },
        {
            $set: {
                invoiceDate: billDetails.invoiceDate,
            }
        },
        (err, list) => {
            if (err) {
                console.log(err)
            } else {
                if (list) {
                    return res.send({
                        message: "Bill Date Updated Successfully",
                    })
                }
            }
        }
    )
}

export default updateBillDate;
import DesignForm from '../../schema/designForm/designFormSchema.js'

const updateCustomerReport = (req, res) => {
    // Geting values from forntend
    const { customerPerAmount } = req.body;

    customerPerAmount.map((items, index) => {
        DesignForm.findByIdAndUpdate(
            { _id: items.id },
            {
                $set: {
                    perAmount: parseInt(items.amount),
                }
            },
            (err, list) => {
                if (err) {
                    console.log(err)
                } else {
                    if (list) {
                        list.save();
                    }
                }
            }
        )
    })
    return res.send({
        message: "Updated SuccessFully",
    })

}

export default updateCustomerReport;
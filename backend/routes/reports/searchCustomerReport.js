import DesignForm from '../../schema/designForm/designFormSchema.js'

const searchCustomerReport = async (req, res) => {
    const { formValues } = req.body;
    try {
        DesignForm.find({ companyName: formValues.companyName, designSubmissionDate: { $lt: formValues.endDate, $gt: formValues.startDate } }, (error, designForm) => {
            if (designForm.length > 0) {
                const designData = designForm.filter((data) => {
                    return data.companyName === formValues.companyName
                })
                if (designData.length > 0) {
                    return res.send({
                        message: "Design Data Found",
                        data: designData,
                    })
                } else {
                    return res.send({
                        message: "No Data Found",
                        data: []
                    })
                }
            } else {
                return res.send({
                    message: "No Data Found",
                    data: []
                })
            }
        })


    } catch (error) {
        console.log(error)
    }
}

export default searchCustomerReport;
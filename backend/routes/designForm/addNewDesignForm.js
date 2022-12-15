import DesignForm from '../../schema/designForm/designFormSchema.js'

const addNewDesignForm = async (req, res) => {
    // Geting values from forntend
    const { formValues, imageUrl } = req.body;

    try {
        // Creating customer document
        const designForm = new DesignForm({
            designEntryType: formValues.designEntryType,
            companyName: formValues.companyName,
            initalName: formValues.initalName,
            customerGSTno: formValues.customerGSTno,
            customerName: formValues.customerName,
            customerNumber: formValues.customerNumber,
            customerEmail: formValues.customerEmail,
            designMainType: formValues.designMainType,
            designMainSubType: formValues.designMainSubType,
            designDetail: formValues.designDetail,
            designSamplePhoto: imageUrl,
            designSubmissionDate: formValues.designSubmissionDate,
            remark: formValues.remark,
            EmployeeName: formValues.EmployeeName,
            authorizedName: formValues.authorizedName,
            designNumber: "",
        })
        // Saving customer on DB(back-End)
        await designForm.save()
        return res.send({
            message: "Design Form created"
        })
        // }
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message
        })
    }

}

export default addNewDesignForm;
import DesignForm from '../../schema/designForm/designFormSchema.js'

const uploadWork = (req, res) => {
    // Geting values from forntend
    const { uploadWorkFormValues, imageUrl } = req.body

    DesignForm.findByIdAndUpdate(
        { _id: uploadWorkFormValues.up_id },
        {
            $set: {
                designFullName: uploadWorkFormValues.up_designFullName,
                designTotoalCard: uploadWorkFormValues.up_designCardUse,
                designFinalImage: "",
                finalDesignImage: imageUrl,
            }
        },
        (err, list) => {
            if (err) {
                console.log(err)
            } else {
                if (list) {
                    return res.send({
                        message: "Work Uploaded successfully"
                    })
                }
            }
        }
    )
}

export default uploadWork;
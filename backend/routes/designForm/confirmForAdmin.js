import DesignForm from '../../schema/designForm/designFormSchema.js'

const confirmForAdmin = (req, res) => {
    // Geting values from forntend
    const { id, submittedDate } = req.body

    DesignForm.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                status: "completed",
                submittedDate: submittedDate,
            }
        },
        (err, list) => {
            if (err) {
                console.log(err)
            } else {
                if (list) {
                    return res.send({
                        message: "Design submitted for review"
                    })
                }
            }
        }
    )
}

export default confirmForAdmin;
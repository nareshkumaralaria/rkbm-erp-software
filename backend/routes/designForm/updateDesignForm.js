import DesignForm from '../../schema/designForm/designFormSchema.js'

const updateDesignForm = (req, res) => {
    // Geting values from forntend
    const { id } = req.body

    DesignForm.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                status: "assigned"
            }
        },
        (err, list) => {
            if (err) {
                console.log(err)
            } else {
                if (list) {
                    return res.send({
                        message: "Work Assigned to Employee"
                    })
                }
            }
        }
    )
}

export default updateDesignForm;
import DesignForm from '../../schema/designForm/designFormSchema.js'

const updateDesignNumber = (req, res) => {
    // Geting values from forntend
    const { workID, generatedDesignNumber } = req.body

    DesignForm.findByIdAndUpdate(
        { _id: workID },
        {
            $set: {
                designNumber: generatedDesignNumber
            }
        },
        (err, list) => {
            if (err) {
                console.log(err)
            } else {
                if (list) {
                    return res.send({
                        message: "Design Number Assigned"
                    })
                }
            }
        }
    )
}

export default updateDesignNumber;
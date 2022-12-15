import DesignForm from '../../schema/designForm/designFormSchema.js'

const getDesignFormData = async (req, res) => {
    try {
        const designForm = await DesignForm.find({})
        return res.send(designForm);
    } catch (error) {
        console.log(error)
    }
}

export default getDesignFormData;
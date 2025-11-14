import Joi from 'joi'

const userSchema = Joi.object({
    page: Joi.number().label("page"),
    limit: Joi.number().label('limit'),
    name: Joi.string().optional().label("name")
})
export default userSchema
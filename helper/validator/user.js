import Joi from 'joi'
const duserObj = Joi.schema({
    page: Joi.number().label("page"),
    limit: Joi.number().label('limit'),

    name: Joi.string().optional().label("name")
})
// export default userObj
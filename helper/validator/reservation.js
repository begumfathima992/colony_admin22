import Joi from 'joi'

const reservationSchema = Joi.object({
    page: Joi.number().label("page"),
    limit: Joi.number().label('limit'),
    name: Joi.string().optional().label("name")
});

export const reservation_byIdSchema = Joi.object({
    user_id: Joi.number().required().label("page"),
});

export default reservationSchema
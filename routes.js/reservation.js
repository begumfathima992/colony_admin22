
import reservationControllerObj from '../controller/reservation.js'
import express from 'express'
const reservationRoutes=express.Router()

reservationRoutes.get("/fetch",reservationControllerObj.get_all)
reservationRoutes.get("/get_by_user_id",reservationControllerObj.get_by_user_id)
reservationRoutes.get("/get_cancel_reservations",reservationControllerObj.get_canceled_reservations)
export default reservationRoutes
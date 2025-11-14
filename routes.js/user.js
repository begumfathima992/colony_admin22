import UserControllerObj from "../controller/user.js";
import express from 'express'

const UserRoutes=express.Router()
UserRoutes.get("/fetch_user",UserControllerObj.getUser)

export default UserRoutes
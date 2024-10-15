import { Router } from 'express'
import {
    getCurrentUser,
    getCurrentUserRoles,
    login,
    logout,
    refreshAccessToken,
    register,
    updateCurrentUser,
} from '../controllers/auth'
import auth from '../middlewares/auth'
import {
    validateAuthentication,
    validateUserBody,
} from '../middlewares/validations'
import { routesConfig } from './routesConfig'

const authRouter = Router()

authRouter.get(routesConfig.AuthUser.path, auth, getCurrentUser)
authRouter.patch(routesConfig.AuthMe.path, auth, updateCurrentUser)
authRouter.get(routesConfig.AuthRoles.path, auth, getCurrentUserRoles)
authRouter.post(routesConfig.AuthLogin.path, validateAuthentication, login)
authRouter.get(routesConfig.AuthToken.path, refreshAccessToken)
authRouter.get(routesConfig.AuthLogout.path, logout)
authRouter.post(routesConfig.AuthRegister.path, validateUserBody, register)

export default authRouter

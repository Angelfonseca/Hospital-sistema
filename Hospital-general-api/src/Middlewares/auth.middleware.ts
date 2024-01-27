import 'dotenv/config'
import { Request, Response } from 'express'
import jwt from 'jwt-simple'
import moment from 'moment'
import { handleHttp } from '../utils/error.handle'

const secret = process.env.SECRET_JWT || ''

interface MyUserRequest extends Request {
  user?: string;
}

const ensureAuth = async (req: MyUserRequest, res: Response, next: any) => {
  if (!req.headers.authorization) {
    return handleHttp(res, 403, 'AUTHORIZATION ERROR')
  }
  const token = req.headers.authorization.replace(/['"]+/g, '')
  let payload
  try {
    payload = jwt.decode(token, secret)
    if (payload.exp <= moment().unix()) {
      return handleHttp(res, 401, 'AUTHORIZATION TOKEN EXPIRED')
    }
  } catch (error) {
    return handleHttp(res, 401, 'INVALID AUTHORIZATION TOKEN')
  }

  req.user = payload
  next()
}
  
export default ensureAuth
import { User } from "../interfaces/users.interface";
import UserModel from "../models/users.model";
import { handleHttp } from "../utils/error.handle";

const getUsers = async () => {
  const users = await UserModel.find();
  return users;
};
const createUser = async (user: User) => {
  const userData = await UserModel.create(user)
  return userData;
}
const isMatchPassword = async (user: any, password: string) => {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, function(err: any, isMatch: any) {
      if (err) reject(err);
      resolve(isMatch)
    });
  })
}
const login = async (credentials: any) => {
  const user = await UserModel.findOne({ username: credentials.username });
  if (!user) {
    return { error: true, message: 'USER NOT FOUND' }
  }
  const matchPassword = await isMatchPassword(user, credentials.password);
  if (matchPassword) {
    return { error: false, user }
  }
  return { error: true, message: 'INVALID CREDENTIALS' }
}

export default {
  getUsers,
  createUser,
  login
};
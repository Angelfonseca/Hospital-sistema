import "dotenv/config";
import jwt from "jwt-simple";
import moment from "moment";
const secret = process.env.SECRET_JWT || "";

const createToken = (obj: any) => {
  let payload = {
    id: obj.id,
    username: obj.username,
    iat: moment().unix(),
    exp: moment().add(4, "hours").unix(),
  };
  return jwt.encode(payload, secret);
};

const jwtMethods = {
  createToken,
};

export default jwtMethods;

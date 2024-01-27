import {Schema , model} from 'mongoose';
import {User} from '../interfaces/users.interface';
import 'dotenv/config';
import { env } from 'process';
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = env.SALTO || 10;

const UserSchema = new Schema<User>(
    {
      name: {
        type: String
      },
      username: {
        type: String,
        unique: true,
        required: true
      },
      password: {
        type: String
      }
    },
    {
      timestamps: true
    }
  )
  UserSchema.pre('save', function(next) {
    var user = this;
  
    
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err: any, salt: any) {
        if (err) return next(err);
  
        bcrypt.hash(user.password, salt, function(err: any, hash: any) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
  });
  UserSchema.methods.comparePassword = function(candidatePassword: any, cb: any) {
    bcrypt.compare(candidatePassword, this.password, function(err: any, isMatch: any) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
  };
      
  
  const UserModel = model("user", UserSchema)
  
  export default UserModel
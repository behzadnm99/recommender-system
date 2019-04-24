import mongoose from 'mongoose';
import passport from 'passport';
import auth from '../routes/auth';

const Users = mongoose.model('user');

const userController = {};

userController.create = (req, res) => {
    const { body: {user} } = req;
    if(!user.email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }
  
    if(!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }
  
    const finalUser = new Users(user);
  
    finalUser.setPassword(user.password);
  
    return finalUser.save()
      .then(() => 
        res.json({ user: finalUser.toAuthJSON() }));
}

export default userController;
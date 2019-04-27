import mongoose from 'mongoose';
import passport from 'passport';
import auth from '../routes/auth';

const Users = mongoose.model('user');

const userController = {};

userController.signin = (req, res, next) => {
    const { body: {user} } = req;
    if(!user.username) {
      return res.status(422).json({
        errors: {
          username: 'is required',
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

userController.login = (req, res, next) => {
  const { body: { user } } = req;
  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
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

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {    
    
    console.log(passportUser)
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() }); 
    }

    return res.send({
      info
    });
  })(req, res, next);
}

userController.current = (req, res, next) => {
    const { payload: { id } } = req;
    console.log(req.payload)
    return Users.findById(id)
      .then((user) => {
        if(!user) {
          return res.sendStatus(400);
        }
        
        return res.json({ user: user.toAuthJSON() });
      });
}

export default userController;
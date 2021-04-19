const User = require('../models/user');
const Token = require('../models/Token');
const jwt = require('jsonwebtoken');
const tokenSecret = "my-token-secret";
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const bcrypt = require('bcrypt');

module.exports = {
 
  Register(req, res, next){
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user) res.status(404).json({ error: 'email already exist' })
      else {
        User.create(req.body)
        .then(u=>{
          const tok=generateToken(u);
          var token=new Token({ _userId: u._id, token: tok });
         
         token.save(function (err) {
          if(err){
            return res.status(500).send({msg:err.message});
          }
          var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
              user: 'mail@gmail.com',
              pass: 'XXXX'
            }
          }));
          var mailOptions = { from: 'mail@gmail.com', to: u.email, subject: 'Account Verification Link', text: 'Hello '+ req.body.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + u.email + '\/' + token.token + '\n\nThank You!\n' };
          transporter.sendMail(mailOptions, function (err) {
              if (err) { 
                  return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
               }
               else{
              return res.status(200).send('A verification email has been sent to ' + u.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
               }
            });
          // res.status(200).header('auth-token',tok).json({_id:u._id,email:u.email,firstName:u.firstName,token:tok})
        })
      })
         .catch(next)
      }
    }
    )
    .catch(next)
  },
  confirmEmail (req, res, next) {
    Token.findOne({ token: req.params.token }, function (err, token) {
        // token is not found into database i.e. token may have expired 
        if (!token){
            return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
        }
        // if token is found then check valid user 
        else{
            User.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
                // not valid user
                if (!user){
                    return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
                } 
                // user is already verified
                else if (user.isVerified){
                    return res.status(200).send('User has been already verified. Please Login');
                }
                // verify user
                else{
                    // change isVerified to true
                    user.isVerified = true;
                    user.save(function (err) {
                        // error occur
                        if(err){
                            return res.status(500).send({msg: err.message});
                        }
                        // account successfully verified
                        else{
                          return res.status(200).send('Your account has been successfully verified');
                        }
                    });
                }
            });
        }
        
    });
},
  Login(req, res, next){
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) res.status(401).json({ error: 'email not exist' })
      else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
           if (match) {
            // res.status(200).json(match)
            if(user.isVerified){
            const tok=generateToken(user);
            res.status(200).header('auth-token',tok).json({_id:user._id,email:user.email,firstName:user.firstName,lastName:user.lastName,token:tok})
        }
        else  res.status(403).json({ error: 'not verified' })
      }
          else  res.status(403).json({ error: 'wrong password' })

        })
      }
    }
    )
    .catch(next)
  },
  // edit(req, res, next){
  //   const clientID = req.params.id;
  //   const clientinfo = req.body;
  //   Client.findByIdAndUpdate({_id: clientID}, clientinfo)
  //   .then(() => Client.findById({_id: clientID}))
  //   .then(cl => res.status(200).send(cl))
  //   .catch(next);
  // },
  // delete(req, res, next){
  //   const clientID = req.params.id;
  //   Client.findByIdAndRemove({_id: clientID})
  //     .then(cl => res.status(204).send(cl))
  //     .catch(next);
  // }
};

function generateToken(user) {
  const t=jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' });
  return t;
}


// task , date , Status
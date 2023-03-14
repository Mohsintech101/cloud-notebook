const express = require("express");
const Cuser = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuserdata = require('../middleware/fetchuserdata')
require('dotenv').config({path: '.env.local'})
const router = express.Router();

const jwtSecret = process.env.REACT_APP_SECRET_SIGN

// ROUTE 1: Create a User using: POST "/api/auth/signup". No login required
//api for user signup or creating new user in the database
router.post(
  "/signup",
  [
    body("name", "name must be of 5 characters").isLength({ min: 5 }),
    body("email", "Enter valid Email").isEmail(),
    body("password", "password must be of minimum 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    //old way
    /* const user = new Cuser(req.body)
    user.save()
    res.send(req.body) */

    //checking before creating new user in try-catch
    try {
      let newUser = await Cuser.findOne({ email: req.body.email });
      if (newUser) {
        return res
          .status(400)
          .json({ errors: "Sorry a user with this email already exists." });
      }

      //creating hash
      const salt = bcrypt.genSaltSync(10)
      const hashPassword = bcrypt.hashSync(req.body.password, salt)


      //new way
      newUser = await Cuser.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });
      //no need of then if we are using try-catch
      //.then((user)=> res.json(user)).catch((errors)=>res.json({errors, message: errors.message}))

      //sending response normal data to the user
      // res.json(newUser);

      //sending authentication token to the user
      const data = {
        user: {
          id: newUser._id
        }
      }
      const authToken = jwt.sign(data, jwtSecret)
      res.json({authToken});


    } catch (errors) {
      console.log(errors.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
//user login/signin api
router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Enter valid Password').exists()
], async (req,res) =>{

  let success = false

  //check for errors and if there are, return bad requests and the errors
  const errors = validationResult(req)
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors: errors.array()})
  }

  //destructuring the data received in req.body
  const { email, password } = req.body

  try{
    //find login email of the user in the database and if does not exists then return error with the same
    const findUserEmail = await Cuser.findOne({email})

    if(!findUserEmail){
      success = false
      return res.status(400).json({error: 'Please try to login with correct credentials'})
    }

    //if email exists then compare provided password with the database password of user findUserEmail
    const comparePassword = bcrypt.compareSync(password, findUserEmail.password)

    if(!comparePassword){
      return res.status(400).json({error: 'Please try login with the correct credentials'})
    }

    //if password is matched then return the user authToken
    //create authData
    const data = {
      user: {
        id: findUserEmail._id
      }
    }

    //create authToken
    const authToken = jwt.sign(data, jwtSecret)  //jwt.sign is sync function so no need of await before the fucntion
    success = true
    res.json({authToken})

  }//send errors for server issue
  catch(errors){
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }
})



// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuserdetails', fetchuserdata , async (req, res) => {

  try{
    userID = req.user.id
    const loggedInUserDetails = await Cuser.findById(userID).select("-password")
    res.send(loggedInUserDetails)
  }
  catch{
    console.error(error.message)
    res.status(500).send('Internal Server Error')
  }

})

module.exports = router;

/* const {Schema} = mongoose */

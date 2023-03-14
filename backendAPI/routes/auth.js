const express = require("express");
const Cuser = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '.env.local'})
const router = express.Router();

const jwtSecret = process.env.REACT_APP_SECRET_SIGN

router.post(
  "/",
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
      res.status(500).send("Some server issue occured");
    }
  }
);

module.exports = router;

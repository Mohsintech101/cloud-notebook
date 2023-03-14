const jwt = require('jsonwebtoken')
require('dotenv').config({path: '.env.local'})

//jwt secret
const jwtSecret = process.env.REACT_APP_SECRET_SIGN

//fecth user details
const fetchuserdata = (req, res, next) => {
    //get user using jwt auth token
    const token = req.header('auth-token')

    //checking for if auth token exists
    if(!token){
        return res.status(401).send({error: "Please authenticate with valid token"})
    }

    //if auth token exits then verify authToken
    try{
        const data = jwt.verify(token, jwtSecret)
        req.user = data.user
        next()
    }//if not verified authToken
    catch(error){
        res.status(401).send({error: 'Please authenticate with valid token'})
    }
}

module.exports = fetchuserdata
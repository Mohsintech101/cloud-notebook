const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config({ path: '.env.local' });
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoURI = process.env.REACT_APP_DB_URI

const port = 5000

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoURI, { useNewUrlParser: true });
  console.log("Database connected")
}

//my way of connect
/* mongoose.connect(mongoURI, {

}) */

//Schema
const formSchema = new mongoose.Schema({
    username: String,
    useremail: String,
    userText: String
  });

//Modal
const modelUser = mongoose.model('User', formSchema);

const app = express()
app.use(cors())
app.use(bodyParser.json())

//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.post('/postdata', async (req, res) => {
    /* console.log(req.body)
    res.json(req.body) */
    const user = new modelUser()
    user.username = req.body.userName,
    user.useremail = req.body.emailAddress,
    user.userText = req.body.textInfo

    const doc = await user.save()

    console.log(doc)
    res.json(doc)
})

app.get('/userdata', async (req,res) => {
    // res.send('Hello port changed')
    const docs = await modelUser.find()
    res.json(docs)
})

app.listen(port, () => {
    console.log(`Backend server is listening on port ${port}`)
})


module.exports =  app 

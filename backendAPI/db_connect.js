const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoURI = 'mongodb+srv://mohsintech101:JWVPxFud7TEia8GK@cluster0.q5nno6g.mongodb.net/?retryWrites=true&w=majority'

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoURI);
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

app.listen(3001, () => {
    console.log(`listening On Local 3001`)
})


module.exports =  app 


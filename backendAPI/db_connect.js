const mongoose = require('mongoose')
const express = require('express')
const mongoURI = 'mongodb+srv://mohsintech101:JWVPxFud7TEia8GK@cluster0.q5nno6g.mongodb.net/?retryWrites=true&w=majority'

const app = express()

mongoose.connect(mongoURI, {

})

app.listen(3000, () => {
    console.log(`listening On Local 3000`)
})


module.exports = app


const app = require('./db_connect')

app.get('/userdata', (req,res) => {
    res.send('Hello, Today my task is to complete form creation and send the data to the mongoDB')
})


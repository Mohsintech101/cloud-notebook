const express = require('express')
const Cuser = require("../models/User");

const router = express.Router()

router.get('/', async (req, res) => {
    const docs = await Cuser.find()
    res.json(docs)
})

module.exports = router
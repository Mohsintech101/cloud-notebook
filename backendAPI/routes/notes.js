const express = require('express');
const fetchuserdata = require('../middleware/fetchuserdata');
const Note = require('../models/Notes')
const router = express.Router()
const { body, validationResult } = require('express-validator')

//Get all the user notes from table notes using get method: GET "api/notes/getallnotes" - login required
router.get('/getallnotes', fetchuserdata, async (req, res) => {
    try{
        const notes = await Note.find({ user: req.user.id })
    res.json(notes)
    }
    catch(error){
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
})


//create new notes using: POST "api/notes/addnote"  - login required
router.post('/addnote', fetchuserdata, [
    body('title', 'Enter a valid title').isLength({min: 5}),
    body('description', 'Enter a valid description').isLength({min: 10})
] , async (req, res) => {

    //check for errors, if there are send the user with bad requests and errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //destructuring the data received in req.body
    const { title, description, tag } = req.body

    try{
        const newNote = new Note({ title, description, tag, user: req.user.id})
        const saveNote = await newNote.save()
        res.json(saveNote)
     }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
    
})


//update an existing note using put: PUT "/api/notes/updatenote" - login required
router.put('/updatenote/:id', fetchuserdata , async (req, res) => {
    try{
        //destructuring req.body
        const { title, description, tag } = req.body

        //create newNotes Object
        const newNote = {}

        if(title){
            newNote.title = title
        }
        if(description){
            newNote.description = description
        }
        if(tag){
            newNote.tag = tag
        }

        //find the note which needs to be updated
        let findNote = await Note.findById(req.params.id)

        //if Note does not exists
        if(!findNote){
            return res.status(404).send('Not Found')
        }

        //if user ID does not mached
        if(findNote.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed')
        }

        //if matched then update Note
        findNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({findNote})
    }
    catch(error){
        console.error(error.message)
        res.status(500).send('Internal server Error')
    }
})

//Delete an existing note using: DELETE "/api/note/deletenote" - login required
router.delete('/deletenote/:id', fetchuserdata, async (req, res) => {
    try{
        //find note that needs to be deleted
        let findNote = await Note.findById(req.params.id)

        //if Note does not exists
        if(!findNote){
            return res.status(404).send('Not found')
        }

        //if user ID does not mached
        if(findNote.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed')
        }

        //if matched then update Note
        findNote = await Note.findByIdAndDelete(req.params.id)
        res.json({ success: 'Note has been deleted', note: findNote })
    }
    catch(error){
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router
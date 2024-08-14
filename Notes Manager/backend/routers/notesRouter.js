const express = require('express');
const router = express.Router();
const note = require('../models/note');

router.get('/notes', async (req,res) => {
    const notes=await note.find();
    res.send(notes);
})

router.get('/notes/:subject', async (req,res) => {
    const sub=req.params.subject;
    const notes=await note.find({subject:sub});
    res.send(notes);
})

router.post('/notes', async (req,res) => {
    const notedata=req.body;
    
    // const newNote=new note({
    //     content
    // });
    const newNote = new note(notedata);
    try{
        await newNote.save();
        res.status(201).send("note created succesfully");
    }catch(err){
        res.status(400).send("could not create note");
    }
})
router.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const updatedNote = await note.findByIdAndUpdate(id, { content }, { new: true });

        if (!updatedNote) {
            res.status(404).send("Note not found");
        } else {
            res.status(200).send("Note updated successfully");
        }
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/notes/:id', async (req,res) => {
    const id=req.params.id;
    try{
        const del=await note.findByIdAndDelete(id);
        if(!del){
            res.send("Not Found");
        }else{
            res.send("Deleted");
        }
    }catch(err){
        res.status(400).send("could not delete note");
    }
})
module.exports = router;

const express = require('express');
const notesModel = require('./Notes.model');

const router = express.Router();

// display all notes
router.get('/', async (req, res) => {
  const allNotes = await notesModel.query();
  res.json(allNotes);
});

// display a specific note
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const requestedNote = await notesModel.query().findById(id);
  console.log(requestedNote);
  if (requestedNote !== undefined) {
    res.status(200).json(requestedNote);
  } else {
    res.status(500).json('note not found');
  }
});

// insert a note
router.post('/', async (req, res) => {
  const { note_content: noteContent } = req.body;
  console.log(noteContent);
  const notesObj = notesModel.query().insert({
    content: noteContent,
  });
  console.log(notesObj.content === noteContent);
  if (notesObj.content === noteContent && noteContent !== undefined) {
    res.status(200).json('inserted successfully');
  } else {
    res.status(500).json('error while inserting');
  }
});

// update a specific note
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { note_content: noteContent } = req.body;
  const requestedNote = await notesModel.query().findById(id).patch({
    content: noteContent,
  });
  console.log(requestedNote);
  if (requestedNote === 1) {
    res.status(200).json('udpated successfully');
  } else {
    res.status(500).json('error while updating');
  }
});

// delete a note
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedNote = await notesModel.query().deleteById(id);
  if (deletedNote === 1) {
    res.status(200).json('note deleted successfully');
  } else {
    res.status(500).json('error while deleting the note');
  }
});

module.exports = router;
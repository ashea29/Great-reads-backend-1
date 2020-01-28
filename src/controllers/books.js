const express = require('express')
const router = express.Router()
const Book = require('../models/Book')


//INDEX ROUTE (returns all books with author ID and name included)
router.get("/", (req, res) => {
  Book.find({})
  .populate('author', ['_id', 'name'])
  .then(books => res.json(books))
})

//SHOW ROUTE
router.get("/books/:id", (req, res) => {
  Book.findOne({_id: req.params.id})
    .populate('author', ['_id', 'name'])
    .then(thisBook => res.json(thisBook))
})


//NEW ROUTE
router.post('/', (req, res) => {
  Book.create(req.body)
    .then(newBook => {
      res.redirect('/')
  })
})

//Create new book with author name supplied
//router.post('/byAuthorName/', (req, res) => {

// QUERY DB WITH AUTHOR NAME
// IF AUTHOR EXISTS
//  ADD BOOK USING THE EXISTING AUTHOR ID
// ELSE
//  POST A NEW AUTHOR (using route which returns the just-created author)
//  ADD BOOK USING THE NEW AUTHOR ID
// END IF


//UPDATE ROUTE
router.put('/books/:id', (req, res) => {
  Book.findOneAndUpdate({_id: req.params.id},
    req.body, {new: true})
    .then(thisBook => {
      res.redirect(303, '/')
    })
})


//DELETE ROUTE
router.delete('/books/:id', (req, res) => {
  Book.findOneAndRemove({_id: req.params.id})
  .then(() => {
    res.redirect(303, '/')
  })
})

module.exports = router
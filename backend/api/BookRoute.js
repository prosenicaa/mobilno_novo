const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/', (req, res) => {
  Book.find()
    .then(books => {
      res.status(200).json(books);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// GET a single book by ID
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (!book) return res.status(404).json({ error: 'Book not found' });
      res.status(200).json(book);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// POST a new book
router.post('/', (req, res) => {
  const newBook = new Book({
    author: req.body.author,
    title: req.body.title,
    year: req.body.year,
    read: req.body.read
  });

  newBook.save()
    .then(book => {
      res.status(201).json(book);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// PUT to update a book
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(book => {
      if (!book) return res.status(404).json({ error: 'Book not found' });
      res.status(200).json(book);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// DELETE a book
router.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
      .then(book => {
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

module.exports = router;

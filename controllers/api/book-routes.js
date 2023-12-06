const router = require('express').Router();
const Book = require('../../models/Book');

//Creates a new book
router.post('/', async (req, res) => {
    try { 
      const bookData = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      page_num: req.body.page_num,
      image: req.body.image,
    });

    res.status(200).json(bookData)
  } catch (err) {
    res.status(400).json(err);
  }
  });

  module.exports = router;
import express from 'express';

const router = express.Router();

router.use('/users', require('./user'));
router.use('/books', require('./book'));
router.use('/movies', require('./movie'));

module.exports = router;
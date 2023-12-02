const router = require('express').Router();
const Review = require('../../models/Review');

router.post('/', async (req, res) => {
    try { 

        const reviewData = await Review.create(

            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.body.user_id,
                book_id: req.body.book_id,
            },
        );

    res.status(200).json(reviewData);
    
    } catch (err) {

            res.status(400).json(err);
    }
});

router.put('/', async (req, res) => {

    try { 

        const update = await Review.update(

            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {

                    id: req.params.id
                }
            }
        );

    
    
    } catch (err) {

        res.status(400).json(err);
    }
});

router.delete('/id:', async (req, res) => {

    try {

        let deletion = await blogPost.destroy(
        
            {
                where: {
    
                    id: req.params.id
                }
            }
        )

        res.status(200).json(deletion);

    } catch (err){

        res.status(400).json(err);
    }

    
});

module.exports = router;
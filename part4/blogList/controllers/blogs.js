const blogRouter = require('express').Router();
const Blog = require('../models/blog');



blogRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs);
        });
});


blogRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if(blog) {
                res.json(blog);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error));
});



blogRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => next(error));
});



blogRouter.put('/:id', (req, res, next) => {
    const { title, author, url , likes } = req.body;



    Blog.findByIdAndUpdate(
        req.params.id,
        { title, author, url , likes },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedBlog => {
            res.json(updatedBlog);
        })
        .catch(error => next(error));
});




blogRouter.post('/', (req, res, next) => {
    const blog = new Blog(req.body);

    blog
        .save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(error => next(error));
});



module.exports = blogRouter;

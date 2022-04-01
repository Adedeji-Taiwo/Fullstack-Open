/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');








blogRouter.get('/', async (req, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 });

    res.json(blogs);
});


blogRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.json(blog.toJSON());
    } else {
        res.status(404).end();
    }

});



blogRouter.delete('/:id', async (req, res) => {
    const user = req.user;

    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({
            error: 'token missing or invalid'
        });
    }

    const deleteBlog = await Blog.findById(req.params.id);

    if (deleteBlog.user._id.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(req.params.id);
        res.status(204).end();
    }

});



blogRouter.put('/:id', async (req, res) => {
    const { title, author, url , likes } = req.body;



    const changedBlog = await  Blog.findByIdAndUpdate(
        req.params.id,
        { title, author, url , likes },
        { new: true, runValidators: true, context: 'query' }
    );

    res.json(changedBlog);
});




blogRouter.post('/', async (req, res) => {
    const body = req.body;
    const user = req.user;


    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({
            error: 'token missing or invalid'
        });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    });


    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
});



module.exports = blogRouter;

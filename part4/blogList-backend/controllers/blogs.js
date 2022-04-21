/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');





blogRouter.get('/', async (req, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 });

    res.json(blogs.map((blog) => blog.toJSON()));
});


blogRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('user', { username: 1, name: 1 });
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
    } else {
        res.status(400).end();
    }

});



blogRouter.put('/:id', async (req, res) => {
    const likeObject = {
        likes: req.body.likes,
    };


    const changedBlog = await  Blog.findByIdAndUpdate(
        req.params.id,
        likeObject,
        { new: true, runValidators: true, context: 'query' }
    );

    const populatedBlog = await changedBlog.populate('user', { username: 1, name: 1 });

    res.json(populatedBlog.toJSON());
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
        likes: body.likes || 0,
        user: user._id
    });


    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();


    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 });

    res.status(201).json(populatedBlog.toJSON());
});



module.exports = blogRouter;

const Blog = require('../models/blog');
const User = require('../models/user');


const initialBlogs = [
    {
        title: 'Testing the backend',
        author: 'George Lindsey',
        url: 'https://mediumBlog.com/tech/REST',
        likes: 23
    },
    {
        title: 'Starting with Jest',
        author: 'Kamila Emre',
        url: 'https://simernet.com/testing',
        likes: 5
    }
];



const nonExistingId = async () => {
    const blog = new Blog(
        {
            title: 'will remove this soon',
            author: 'not important',
            url: 'booming.com',
            likes: 5
        }
    );

    await blog.save();
    await blog.remove();

    return blog._id.toString();
};


const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb,
};
/* eslint-disable no-undef */
const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Blog = require('../models/blog');
const User = require('../models/user');


beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});




//TEST BLOCK FOR SAVED BLOG POSTS
describe('when there is initially saved blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    }, 100000);



    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });



    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs');

        const titles = response.body.map(r => r.title);
        expect(titles).toContain('Testing the backend');
    });



    test('verify unique id property of blog posts', async () => {
        const response = await api.get('/api/blogs');

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined();
        });
    });

});





//TEST BLOCK FOR BLOG ADDITION
describe('addition of a new blog', () => {
    let token = null;
    beforeAll(async () => {
        await User.deleteMany({});

        const testUser = await new User({
            name: 'Carl',
            username: 'Pete',
            passwordHash: await bcrypt.hash('Jonah', 10),
        }).save();

        const userForToken = { username: 'Pete', id: testUser.id };
        token = jwt.sign(userForToken, process.env.SECRET);
        return token;
    });


    test('succeeds if a token is provided', async () => {
        const newBlog = {
            title: 'Getting started with Lodash',
            author: 'Jameson Flaming',
            url: 'http://sadish.com/library/lodash',
            likes: 3,
            userId: '62378925b0fc3bc68325e172'
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/);



        const blogAtEnd = await helper.blogsInDb();
        expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        const contents = blogAtEnd.map(n => n.title);
        expect(contents).toContain('Getting started with Lodash');
    });



    test('fails if a token is not provided', async () => {
        const newBlog = {
            title: 'Getting started with Lodash',
            author: 'Jameson Flaming',
            url: 'http://sadish.com/library/lodash',
            likes: 3,
            userId: '62378925b0fc3bc68325e172'
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/);



        const blogAtEnd = await helper.blogsInDb();
        expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);

        const contents = blogAtEnd.map(n => n.title);
        expect(contents).not.toContain('Getting started with Lodash');
    });


    test('fails if likes property is missing, default to 0', async () => {
        const newBlog = {
            title: 'refactoring codes the right way',
            author: 'Unai Tavares',
            url: 'http://codingcamp.com/standards/',
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400);

        const blogAtEnd = await helper.blogsInDb();

        blogAtEnd.map(blog => {
            if (blog.title === newBlog.title) {

                expect(blog.likes).toEqual(0);
            }
        });
    });


    test('fails with status code 400 if title and url is missing from request data', async () => {
        const newBlog = {
            author: 'Oscar best',
            likes: 27,
        };


        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400);

        const blogAtEnd = await helper.blogsInDb();

        expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
    });
});




//TEST BLOCK FOR VIEWING BLOG WITH UNIQUE ID
describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb();

        const blogToView = blogsAtStart[0];

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

        expect(resultBlog.body).toEqual(processedBlogToView);
    });


    test('fails with status code 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId();

        console.log(validNonexistingId);

        await api
            .get(`/api/blogs/${validNonexistingId}`)
            .expect(404);
    });


    test('fails with status code 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445';

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400);
    });

});




//TEST BLOCK FOR BLOG DELETION
describe('deletion of a blog', () => {
    let token = null;
    beforeEach(async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});

        const testUser = await new User({
            name: 'Carl',
            username: 'Pete',
            passwordHash: await bcrypt.hash('sawdust', 10),
        }).save();

        const userForToken = { username: 'Pete', id: testUser.id };
        token = jwt.sign(userForToken, process.env.SECRET);

        const newBlog = {
            title: 'Testing Blog',
            author: 'Pete',
            url: 'extras.com',
            likes: 50
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201);

        return token;
    });


    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204);

        const blogsAtEnd = await helper.blogsInDb();


        expect(blogsAtEnd).toHaveLength(0);

        const contents = blogsAtEnd.map(r => r.title);

        expect(contents).not.toContain(blogToDelete.title);
    });



    test('fails with status code 400 if user token is not provided', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(401);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        );

        const contents = blogsAtEnd.map(r => r.title);

        expect(contents).toContain(blogToDelete.title);
    });
});



afterAll(() => {
    mongoose.connection.close();
});
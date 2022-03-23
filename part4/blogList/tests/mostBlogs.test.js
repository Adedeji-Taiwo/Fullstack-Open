const mostBlogs = require('../utils/list_helper').mostBlogs;
const listWithManyBlogs = require('../data/listwithManyBlogs').listWithManyBlogs;



describe('most blog', () => {

    test('is by', () => {
        const result = mostBlogs(listWithManyBlogs);

        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        });
    });
});
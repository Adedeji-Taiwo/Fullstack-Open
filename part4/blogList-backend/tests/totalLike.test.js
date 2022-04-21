const totalLikes = require('../utils/list_helper').totalLikes;
const listWithManyBlogs = require('../data/listwithManyBlogs').listWithManyBlogs;
const listWithOneBlog = require('../data/listWithOneBlog').listWithOneBlog;

describe('total likes', () => {


    test('of empty list is zero', () => {
        const result = totalLikes([]);

        expect(result).toBe(0);
    });


    test('when list has only one blog, equals the likes of that blog', () => {
        const result = totalLikes(listWithOneBlog);

        expect(result).toBe(5);
    });


    test('of a bigger list is calculated right', () => {
        const result = totalLikes(listWithManyBlogs);

        expect(result).toBe(36);
    });

});
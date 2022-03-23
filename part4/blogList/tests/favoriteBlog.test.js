const favoriteBlog = require('../utils/list_helper').favoriteBlog;
const listWithManyBlogs = require('../data/listwithManyBlogs').listWithManyBlogs;



describe('favorite blog', () => {

    test('is this particular one', () => {
        const result = favoriteBlog(listWithManyBlogs);
        console.log(result);


        expect(result).toEqual(
            {
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                likes: 12
            },
        );
    });
});
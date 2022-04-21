const mostLikes = require('../utils/list_helper').mostLikes;
const listWithManyBlogs = require('../data/listwithManyBlogs').listWithManyBlogs;

describe('most likes', () => {
    test('is garnered by', () => {
        const result = mostLikes(listWithManyBlogs);

        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        });
    });
});


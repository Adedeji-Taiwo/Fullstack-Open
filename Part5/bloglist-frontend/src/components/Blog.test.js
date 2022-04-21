import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog /> component', () => {

    const newBlog = {
        title: 'Testing Component Render',
        author: 'Cam Bender',
        url: 'www.starring.com/blog',
        likes: 22,
        user: {
            name: 'Adewale',
            username: 'whalexy'
        }
    };

    let container;
    const handleLikes = jest.fn();
    const handleRemoval = jest.fn();

    beforeEach(() => {
        container = render(
            <Blog blog = {newBlog} user={newBlog.user} handleLikes={handleLikes} handleRemoval={handleRemoval}/>
        ).container;
    });



    test('displays a blog with content', async () => {
        expect(container).toBeDefined();
        screen.debug();
    });


    test('renders the blogs title and author, but not its url or number of likes', () => {

        const title = container.querySelector('blog-title');
        const author = container.querySelector('blog-author');

        expect(title).toBeDefined();
        expect(author).toBeDefined();

        const fullBlog = container.querySelector('full-blog');
        const url = container.querySelector('blog-url');
        const likes = container.querySelector('blog-likes');

        expect(fullBlog).toBe(null);
        expect(url).toBe(null);
        expect(likes).toBe(null);
    });


    test('renders the blogs url and number of likes when view button is clicked', () => {
        let button = screen.getByText('view');
        userEvent.click(button);

        const fullBlog = container.querySelector('full-blog');
        const url = container.querySelector('blog-url');
        const likes = container.querySelector('blog-likes');

        expect(fullBlog).toBeDefined();
        expect(url).toBeDefined();
        expect(likes).toBeDefined();

        button = screen.getByText('hide');
        expect(button).toBeDefined();
    });

    test('hides full blog on clicking hide button', () => {
        let button = screen.getByText('view');
        userEvent.click(button);

        button = screen.getByText('hide');
        expect(button).toBeDefined();
        userEvent.click(button);

        const fullBlog = container.querySelector('full-blog');
        const url = container.querySelector('blog-url');
        const likes = container.querySelector('blog-likes');

        expect(fullBlog).toBe(null);
        expect(url).toBe(null);
        expect(likes).toBe(null);
    });


    test('calls handleLikes prop twice if like button is clicked twice', () => {
        const button = screen.getByText('view');
        userEvent.click(button);


        const likeButton = screen.getByText('like');
        userEvent.click(likeButton);
        userEvent.click(likeButton);

        expect(handleLikes.mock.calls).toHaveLength(2);
    });
});
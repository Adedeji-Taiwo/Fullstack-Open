import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewBlog from './NewBlog';
import userEvent from '@testing-library/user-event';


describe('<newBlog /> form', () => {
    test('calls the event handler it received as props with the right details when a new blog is created.', () => {
        const createBlog = jest.fn();

        const { container } = render(<NewBlog createBlog={createBlog}/>);

        const title = container.querySelector('#title');
        const author = container.querySelector('#author');
        const url = container.querySelector('#url');
        const submit = screen.getByText('create');

        userEvent.type(title, 'Saving the Joker');
        userEvent.type(author, 'Harley Quin');
        userEvent.type(url, 'www.gotham.com');
        userEvent.click(submit);

        screen.debug();
        console.log(createBlog.mock.calls[0]);
        expect(createBlog.mock.calls).toHaveLength(1);
        expect(createBlog.mock.calls[0][0].title).toBe('Saving the Joker');
        expect(createBlog.mock.calls[0][0].author).toBe('Harley Quin');
        expect(createBlog.mock.calls[0][0].url).toBe('www.gotham.com');
    });
});
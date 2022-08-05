import React, { useState } from 'react';
import PropTypes from 'prop-types';


const NewBlog = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newUrl, setNewUrl] = useState('');



    const addBlog = (event) => {
        event.preventDefault();

        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0,
        });

        setNewTitle('');
        setNewAuthor('');
        setNewUrl('');
    };


    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
          title
                    <input
                        type="text"
                        value={newTitle}
                        name="title"
                        id = 'title'
                        onChange={({ target }) => setNewTitle(target.value)}
                    />
                </div>
                <div>
          author
                    <input
                        type="text"
                        value={newAuthor}
                        name="author"
                        id='author'
                        onChange={({ target }) => setNewAuthor(target.value)}
                    />
                </div>
                <div>
          url
                    <input
                        type="text"
                        value={newUrl}
                        name="url"
                        id = 'url'
                        onChange={({ target }) => setNewUrl(target.value)}
                    />
                </div>
                <button type="submit" id="create">create</button>
            </form>
        </>
    );
};


NewBlog.propTypes = {
    createBlog: PropTypes.func.isRequired
};

export default NewBlog;
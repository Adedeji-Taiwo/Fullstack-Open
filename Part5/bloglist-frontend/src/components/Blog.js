import React, { useState } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';



const Blog = ({ blog, user, handleLikes, handleRemoval }) => {
    const [view, setView] = useState(false);


    const toggleView = () => {
        setView(!view);

    };

    const deleteButton = blog.user.name === user.name && (
        <Button text = 'delete' onClick={handleRemoval}/>
    );

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };


    if (view) {
        return (
            <div style={blogStyle}>
                <p>
                    <span> {blog.title} - {blog.author}</span>
                    <Button text = {view ? 'hide' : 'view'} onClick={toggleView}/>
                </p>
                <p>{blog.url}</p>
                <p>
                    <span>{blog.likes}</span> {' '}
                    <span>{blog.likes === 1 ? 'like' : 'likes'}</span> {' '}
                    <Button text = 'like' onClick = {handleLikes}/>
                </p>
                <p>{blog.user.name}</p>
                <p>{deleteButton}</p>
            </div>
        );
    }

    return (
        <div style={blogStyle}>
            {blog.title} - {blog.author}
            <Button text = {view ? 'hide' : 'view'} onClick={toggleView}/>
        </div>
    );};



Blog.propTypes = {
    handleLikes: PropTypes.func.isRequired,
    handleRemoval: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};



export default Blog;
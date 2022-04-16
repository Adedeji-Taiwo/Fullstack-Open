import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import Button from './components/Button';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';



const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [notification, setNotification] = useState({ message: null, type: null });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const noteFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then(returnedBlogs =>
            setBlogs(returnedBlogs)
        );
    }, []);


    useEffect(() => {
        const loggedUSerJSON = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUSerJSON) {
            const recoveredUser = JSON.parse(loggedUSerJSON);
            setUser(recoveredUser);
        }
    }, []);



    const addBlog = (blogObject) => {
        noteFormRef.current.toggleVisibility();

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog));
                setNotification({
                    message: `A new blog ${returnedBlog.title}! by ${returnedBlog.author} added`,
                    type: 'success',
                });
                setTimeout(() => {
                    setNotification({ message: null, type: null });
                }, 5000);
            })
            .catch(() => {
                setNotification({
                    message: 'New blog creation failed',
                    type: 'error'
                });
                setTimeout(() => {
                    setNotification({ message: null, type: null });
                }, 5000);
            });
    };


    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username, password,
            });


            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            );
            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
            setNotification({
                message: 'login successful',
                type: 'success'
            });
            setTimeout(() => {
                setNotification({ message: null, type: null });
            }, 5000);
        }  catch (error) {
            setNotification({
                message: 'login failed',
                type: 'error'
            });
            setTimeout(() => {
                setNotification({ message: null, type: null });
            }, 5000);
        }
    };


    const handleRemoval = (id) => {
        const blog = blogs.find(n => n.id === id);
        const deleteBlog = { ...blog };

        if (window.confirm(`Remove blog ${deleteBlog.title}! by ${deleteBlog.author}?`)) {
            blogService
                .remove(id, deleteBlog)
                .catch(() => {
                    setNotification({
                        message: `Information of ${deleteBlog.title} has already been removed from server`,
                        type: 'error'
                    });
                    setTimeout(() => {
                        setNotification({ message: null, type: null });
                    }, 5000);

                    setBlogs(blogs.filter(n => n.id !== id));
                });

            setBlogs(blogs.filter(n => n.id !== deleteBlog.id));

            setNotification({
                message: `${deleteBlog.title} by ${deleteBlog.author} deleted Successfully`,
                type: 'success'
            });
            setTimeout(() => {
                setNotification({ message: null, type: null });
            }, 5000);
        }
        else {
            setNotification({ message: null, type: null });
        }
    };




    const handleLogout = (e) => {
        e.preventDefault();

        window.localStorage.removeItem('loggedBlogAppUser');
        setUsername('');
        setPassword('');
        setUser(null);
        blogService.removeToken();
    };


    const handleLikes = (id) => {
        const blog = blogs.find(n => n.id === id);
        const changeBlog ={ ...blog, likes: blog.likes + 1 };

        blogService
            .update(id, changeBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map((blog) => blog.id === id ? returnedBlog : blog));
                setNotification({
                    message: `You liked ${returnedBlog.title} by ${returnedBlog.author}`,
                    type: 'success'
                });
                setTimeout(() => {
                    setNotification({ message: null, type: null });
                }, 5000);
            })
            .catch(() => {
                setNotification({
                    message: 'Could not update like',
                    type: 'error'
                });
                setTimeout(() => {
                    setNotification({ message: null, type: null });
                }, 5000);
                setBlogs(blogs.filter(n => n.id !== id));
            });
    };


    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification notification={notification}/>
                <Togglable buttonLabel = 'login'>
                    <LoginForm
                        username={username}
                        setUsername = {setUsername}
                        password = {password}
                        setPassword = {setPassword}
                        handleLogin = {handleLogin}
                    />
                </Togglable>
            </div>
        );
    }



    return (
        <div>
            <h2 className='blogs'>blogs</h2>
            <Notification notification={notification}/>
            <p>
                <span>{user.name} logged in</span> {' '}
                <Button text = 'logout' onClick={handleLogout}/>
            </p>
            <Togglable buttonLabel = 'new blog'  ref={noteFormRef}>
                <NewBlog createBlog={addBlog} />
            </Togglable>
            {blogs.sort((a, b ) => {
                if (a.likes > b.likes) return -1;
                if (a.likes < b.likes) return 1;
                return 0;
            })
                .map(blog => <Blog key={blog.id} blog={blog} handleRemoval = {() => handleRemoval(blog.id)} handleLikes={() => handleLikes(blog.id)}  user={user}/> )
            }
        </div>
    );
};

export default App;
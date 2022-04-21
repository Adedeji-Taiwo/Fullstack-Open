const dummy = (blogs) => {
    if (blogs) {
        return 1;
    }
};




const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item;
    };

    return blogs.length === 0 ?
        0 :
        blogs.map(item => item.likes)
            .reduce(reducer, 0);
};


const favoriteBlog = (blogs) => {
    const allLikes = blogs.map(blog => blog.likes);
    const maxFav = Math.max(...allLikes);
    const fav = blogs.find(blog => blog.likes === maxFav);


    delete fav._id;
    delete fav.url;
    delete fav.__v;


    return blogs.length === 0 ?
        {} :
        fav;

};


const mostBlogs = (blogs) => {
    const authorList = blogs.map(author => author.author);


    const mostOcurringAuthor =  Object.entries(
        authorList.reduce((a, v) => {
            a[v] = a[v] ? a[v] + 1 : 1;
            return a;
        }, {})
    ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];


    const mostOccurringAuthorLength = (blogs.filter(author => author.author === mostOcurringAuthor)).length;

    return  blogs.length === 0 ?
        {} :
        {
            author: mostOcurringAuthor,
            blogs: mostOccurringAuthorLength
        };
};



const mostLikes = (blogs) => {

    const likesTally = blogs.reduce((likesCount, blog) => {
        likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes;
        return likesCount;
    }, {});


    const maxLikesCount = Math.max(...Object.values(likesTally));
    const mostLikedAuthor = Object.keys(likesTally).filter(author => likesTally[author] === maxLikesCount);

    return  blogs.length === 0 ?
        {} :
        {
            author: mostLikedAuthor[0],
            likes: maxLikesCount
        };
};



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};
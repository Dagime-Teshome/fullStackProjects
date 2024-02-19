const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs = []) => {
  let totalLikes = 0;
  blogs.forEach((blog) => {
    totalLikes += blog.likes;
  });

  return totalLikes;
};

const favoriteBlog = (blogs = []) => {
  let favoriteBlog;
  blogs.forEach((blog, i) => {
    if (i === 0) {
      favoriteBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
    if (blog.likes >= favoriteBlog.likes) {
      favoriteBlog = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
  });
  return favoriteBlog;
};

const mostBlogsLodash = (blogs = []) => {
  const authorsBlogCount = _.countBy(blogs, "author");
  const authorWithMostBlogs = _.maxBy(
    _.keys(authorsBlogCount),
    (author) => authorsBlogCount[author]
  );
  return {
    author: authorWithMostBlogs,
    blogs: authorsBlogCount[authorWithMostBlogs] || 0,
  };
};

const mostBlogs = (blogs = []) => {
  let authorList = [];
  blogs.forEach((blog, i) => {
    if (i == 0) {
      authorList.push({ author: blog.author, blogs: 0 });
    }
    let index = authorList.findIndex((author) => author.author === blog.author);
    if (index !== -1) {
      authorList[index].blogs++;
    } else {
      authorList.push({ author: blog.author, blogs: 1 });
    }
  });
  authorList.sort((a, b) => b.blogs - a.blogs);
  return authorList[0];
};

const mostLikesLodash = (blogs = []) => {
  const authorCollection = _.groupBy(blogs, "author");
  const authorLikes = _.mapValues(authorCollection, (authorObject) =>
    _.sumBy(authorObject, "likes")
  );
  const mostLikedAuthor = _.maxBy(
    _.keys(authorLikes),
    (author) => authorLikes[author]
  );
  return {
    author: mostLikedAuthor,
    likes: authorLikes[mostLikedAuthor] || 0,
  };
};

const mostLikes = (blogs = []) => {
  let authorList = [];
  blogs.forEach((blog, i) => {
    if (i == 0) {
      authorList.push({ author: blog.author, likes: 0 });
    }
    let index = authorList.findIndex((author) => author.author == blog.author);
    if (index !== -1) {
      authorList[index].likes = authorList[index].likes + blog.likes;
    } else {
      authorList.push({ author: blog.author, likes: blog.likes });
    }
  });
  authorList.sort((a, b) => b.likes - a.likes);
  return authorList[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  mostBlogsLodash,
  mostLikesLodash,
};

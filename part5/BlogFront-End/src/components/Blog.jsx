import { useState } from "react";
import "./blog.css";
const Blog = ({ user, blog, ondelete, onupdate }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    width: "20%",
    position: "relative",
  };
  const delStyle = {
    position: "absolute",
    top: "2px",
    right: " 2px",
  };
  const [showMore, setShowMore] = useState(false);
  const showDetail = { display: showMore ? "" : "none" };
  const hideDetail = { display: showMore ? "none" : "" };
  const style = { display: "flex", flexDirection: "column" };
  const onDelete = () => {
    ondelete(blog);
  };

  const onLike = () => {
    const newBlog = {
      ...blog,
      likes: ++blog.likes,
    };
    onupdate(newBlog);
  };
  return (
    <div className="blog">
      <div style={blogStyle}>
        {user?.id === blog.user?.id ? (
          <div className="deleteClass" style={delStyle}>
            <button id="deleteButton" onClick={onDelete}>
              Delete
            </button>
          </div>
        ) : null}

        <div className="hideDetail" style={hideDetail}>
          {blog.title} {blog.author}
          <button
            id="moreButton"
            onClick={() => {
              setShowMore(true);
            }}
          >
            More
          </button>
        </div>
        <div className="showDetail" style={showDetail}>
          <div style={style}>
            <span>URL: {blog.url}</span>
            <span className="likeClass">
              Likes: {blog.likes}
              <button id="likeButton" onClick={onLike}>
                like
              </button>
            </span>
            <span>User: {blog.user?.name}</span>
            <button
              onClick={() => {
                setShowMore(false);
              }}
              id="hideButton"
            >
              Hide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Blog;

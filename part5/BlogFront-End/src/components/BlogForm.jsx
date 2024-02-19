import { useState } from "react";
// import "../index.css";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        createBlog({
          title: title,
          author: author,
          url: url,
        });
        setTitle("");
        setAuthor("");
        setUrl("");
      }}
    >
      <label>Title</label>
      <input
        onChange={({ target }) => {
          setTitle(target.value);
        }}
        value={title}
        placeholder="title"
        type="text"
        id="title"
      />
      <label>Author</label>
      <input
        onChange={({ target }) => {
          setAuthor(target.value);
        }}
        value={author}
        placeholder="author"
        type="text"
        id="author"
      />
      <label>Url</label>
      <input
        onChange={({ target }) => {
          setUrl(target.value);
        }}
        value={url}
        placeholder="url"
        type="text"
        id="url"
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;

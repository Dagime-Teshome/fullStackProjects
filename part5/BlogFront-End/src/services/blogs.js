import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};
const updateBlog = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
};

export default { getAll, createBlog, setToken, deleteBlog, updateBlog };

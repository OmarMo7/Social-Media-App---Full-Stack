import axios from 'axios'

// development baseURL: http://localhost:8000/api

const API = axios.create({ baseURL: 'https://my-fake-book.herokuapp.com/' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req

})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const likeComment = (id, comment_id) => API.patch(`/posts/${id}/likeComment/${comment_id}`);
export const editComment = (id, comment_id, editedComment) => API.patch(`/posts/${id}/editComment/${comment_id}`, editedComment, () => {
  console.log(editedComment)
});
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const deleteComment = (post_id, comment_id) => API.delete(`/posts/${post_id}/commentPost/${comment_id}`);
export const signIn = (data) => API.post('/user/signin', data);
export const signUp = (data) => API.post('/user/signup', data);
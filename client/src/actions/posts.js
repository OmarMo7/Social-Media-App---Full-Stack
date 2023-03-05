import * as api from '../api/index.js';

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.fetchPost(id);

    dispatch({ type: "FETCH_POST", payload: data });

    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {

  try {
    dispatch({ type: 'START_LOADING' });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
    console.log(data)
    dispatch({ type: "FETCH_ALL", payload: { data, currentPage, numberOfPages } });
    dispatch({ type: 'END_LOADING' });

  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch, history) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data: dataCreated } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: dataCreated });
    dispatch({ type: 'END_LOADING' });

    history.push(`/posts`)
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: "LIKE", payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const likeComment = (id, comment_id) => async (dispatch) => {
  try {
    const { data } = await api.likeComment(id, comment_id);

    dispatch({ type: "LIKE_COMMENT", payload: data });
    return data.comments

  } catch (error) {
    console.log(error);
  }
}

export const editComment = (id, comment_id, editedComment) => async (dispatch) => {
  try {
    const { data } = await api.editComment(id, comment_id, editedComment);
    const newComment = data.comments.filter(comment => comment.comment_id === comment_id)


    dispatch({ type: "EDIT_COMMENT", payload: { id, newComment, comment_id } });

  } catch (error) {
    console.log(error);
  }
}

export const commentPost = (whole_comment, id) => async (dispatch) => {
  try {

    const { data } = await api.commentPost(whole_comment, id);
    dispatch({ type: "COMMENT", payload: data });
    return data.comments
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(1);
    dispatch({ type: "FETCH_ALL", payload: { data, currentPage, numberOfPages } });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (post_id, comment_id) => async (dispatch) => {
  try {
    await api.deleteComment(post_id, comment_id);
    dispatch({ type: "DELETE_COMMENT", payload: { post_id, comment_id } });
  } catch (error) {
    console.log(error);
  }
};

export const warnDeletion = (post_id) => (dispatch) => {
  try {
    dispatch({ type: "WARN_POST_DELETION", payload: { post_id } });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: 'FETCH_BY_SEARCH', payload: { data } });

    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};
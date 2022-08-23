export default (state = { posts: [], post: '', isLoading: false }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case "FETCH_ALL":
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case "FETCH_BY_SEARCH":
      return { ...state, posts: action.payload.data };
    case "FETCH_POST":
      return { ...state, post: action.payload };
    case "LIKE":
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case "LIKE_COMMENT":
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case "CREATE":
      return { ...state, posts: [...state.posts, action.payload] };
    case "COMMENT":
      return {
        ...state, posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload
          return post
        })
      };
    case "UPDATE":
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case "DELETE":
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    case "DELETE_COMMENT":
      return {
        ...state, posts: state.posts.map((post) => (post._id === action.payload.post_id ?
          post.comments.filter((comment) => comment.comment_id !== action.payload.comment_id)
          : post))
      };
    default:
      return state;
  }
};
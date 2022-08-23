import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { Box } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { commentPost, likeComment, deleteComment } from '../../actions/posts';
import { red } from "@mui/material/colors";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { v4 as uuidv4 } from 'uuid'
import DeleteIcon from '@material-ui/icons/Delete';


import useStyles from './styles';

const CommentSection = ({ post }) => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result.googleId || user?.result?._id
  const [comment, setComment] = useState({
    text: '', likes: [], comment_id: `${uuidv4()}-${Math.floor(Math.random() * 100)}`
    , numLikes: 0, creator: userId
  });
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();
  const theme = useTheme()
  // const [commentLikes, setCommentLikes] = useState(comment?.likes)


  const handleComment = async () => {

    const whole_comment = { ...comment, text: `${user?.result?.name}: ${comment.text}` }

    setComments([...comments, whole_comment]);
    setComment({ ...comment, text: '' });

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });

    await dispatch(commentPost(whole_comment, post?._id));

  };
  const handleLikesOfComments = async (c) => {

    const hasLikedComment = c?.likes?.find((like) => like === userId)
    if (hasLikedComment) {
      setComments(comments.map(comment => comment.comment_id === c.comment_id ? { ...comment, likes: c?.likes?.filter((like) => like !== userId) } : comment))
      setComment((prev) => ({
        ...c, text: '',
        numLikes: prev.numLikes - 1
      }));
    }
    else {
      setComments(comments.map(comment => comment.comment_id === c.comment_id ? { ...comment, likes: [...c.likes, userId] } : comment))
      setComment((prev) => ({
        ...c, text: '',
        numLikes: prev.numLikes + 1
      }));
    }
    await dispatch(likeComment(post._id, c.comment_id))


  }

  const handleDeleteComment = async (c) => {
    setComments(comments.filter((comment) => comment.comment_id !== c.comment_id))
    await dispatch(deleteComment(post._id, c.comment_id))
    console.log("deleted")
  }

  const ViewLikes = ({ c }) => {


    if (c?.likes?.length > 0) {
      return c?.likes?.find((like) => like === userId)
        ? (
          <>
            {console.log("1")}
            <ThumbUpAltIcon fontSize="small" />&nbsp;{c?.likes?.length > 2 ? `You and ${c?.likes?.length - 1} others` : `${c?.likes?.length} like${c?.likes?.length > 1 ? 's' : ''}`}</>
        ) : (
          <>
            {console.log("2")}
            <ThumbUpAltOutlined fontSize="small" />&nbsp;{c?.likes?.length} {c?.likes?.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" /></>;
  };



  return (
    <div>
      <Box sx={{ color: theme.palette.text.primary }}>
        <div className={classes.commentsOuterContainer}>
          <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6">Comments</Typography>
            {comments?.map((c, i) => (
              <div key={i}>
                <Typography key={i} gutterBottom variant="subtitle1">
                  <strong>{c?.text?.split(': ')[0]}:</strong>&nbsp;{c?.text?.split(': ')[1]}
                </Typography>
                <Button size="small" color="primary" onClick={() => { handleLikesOfComments(c) }}>
                  <ViewLikes c={c} />
                </Button>
                {(user?.result?.googleId === c?.creator || user?.result?._id === c?.creator) && (
                  <Button size="small" color="secondary" onClick={() => {
                    handleDeleteComment(c)
                  }}>
                    <DeleteIcon fontSize="small" />
                  </Button>
                )}
              </div>
            ))}
            <div ref={commentsRef} />
          </div>
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField style={{ color: red }} fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment?.text} onChange={(e) => setComment({ ...comment, comment_id: `${uuidv4()}-${Math.floor(Math.random() * 100)}`, text: e.target.value })} />
            <br />
            <Button style={{ marginTop: '10px', color: theme.palette.primary.main, backgroundColor: theme.palette.buttons.main }} fullWidth disabled={!comment?.text?.length} color="primary" variant="contained" onClick={handleComment}>
              Comment
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CommentSection;
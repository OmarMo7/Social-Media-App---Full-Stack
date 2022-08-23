import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { Box } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { commentPost, likeComment, deleteComment, editComment } from '../../actions/posts';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { v4 as uuidv4 } from 'uuid'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import useStyles from './styles';
import './fieldSet.css'

const CommentSection = ({ post }) => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result.googleId || user?.result?._id
  const [comment, setComment] = useState({
    text: '', likes: [], comment_id: `${uuidv4()}-${Math.floor(Math.random() * 100)}`
    , numLikes: 0, creator: userId
  });
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [newComment, setNewComment] = useState('')
  const classes = useStyles();
  const commentsRef = useRef();
  const theme = useTheme()
  const [isEdit, setIsEdit] = useState(false)


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

  const handleEditComment = async (c) => {
    setComments(comments.map(comment => comment.comment_id === c.comment_id ?
      {
        ...comment, text: `${user?.result?.name}: ` + newComment
      } : comment))
    setIsEdit(false)
    await dispatch(editComment(post._id, c.comment_id, {
      comment: `${user?.result?.name}: ` + newComment
    }))
  }

  const ViewLikes = ({ c }) => {


    if (c?.likes?.length > 0) {
      return c?.likes?.find((like) => like === userId)
        ? (
          <>
            <ThumbUpAltIcon fontSize="small" />&nbsp;{c?.likes?.length > 2 ? `You and ${c?.likes?.length - 1} others` : `${c?.likes?.length} like${c?.likes?.length > 1 ? 's' : ''}`}</>
        ) : (
          <>
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
            <br />
            {comments?.map((c, i) => (
              <div key={i}>
                {!isEdit ? (
                  <Typography key={i} gutterBottom variant="subtitle1">
                    <strong>{c?.text?.split(': ')[0]}:</strong>&nbsp;{c?.text?.split(': ')[1]}
                  </Typography>
                ) :
                  (
                    <>
                      <Slide direction='right' in={isEdit}>
                        <div>
                          <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            style={theme.palette.mode === 'dark' && { color: "#32a1ce", backgroundColor: "#fff" }}
                            value={!newComment ? c?.text?.split(': ')[1] : newComment}
                            onChange={(e) => { setNewComment(e.target.value) }}
                          />
                          <Button onClick={() => { setNewComment(c?.text?.split(': ')[1]); setIsEdit(false) }} style={{ marginLeft: "5px" }}>
                            <CancelOutlinedIcon />
                          </Button>
                          <Button onClick={() => { handleEditComment(c) }} style={{ margin: "1px 5px" }}>
                            <DoneOutlinedIcon />
                          </Button>
                        </div>
                      </Slide>

                    </>
                  )}
                {!isEdit && (
                  <>
                    <Button size="small" color="primary" onClick={() => { handleLikesOfComments(c) }}>
                      <ViewLikes c={c} />
                    </Button>
                    <Button size="small" color="primary" onClick={() => { setIsEdit(true) }}>
                      <EditIcon />
                    </Button>
                  </>
                )}
                {!isEdit && (
                  (user?.result?.googleId === c?.creator || user?.result?._id === c?.creator) && (
                    <Button size="small" color="secondary" onClick={() => {
                      handleDeleteComment(c)
                    }}>
                      <DeleteIcon fontSize="small" />
                    </Button>
                  )
                )}
              </div>
            ))}
            <div ref={commentsRef} />
          </div>
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline
              value={comment?.text}
              onChange={(e) => setComment({
                ...comment,
                comment_id: `${uuidv4()}-${Math.floor(Math.random() * 100)}`,
                text: e.target.value
              })} />
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
import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { Box, Divider } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
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
    , numLikes: 0, creator: userId, isEdit: false
  });
  const isMobile = useMediaQuery('(max-width:600px)')
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [newComment, setNewComment] = useState(comment?.text)
  const classes = useStyles();
  const commentsRef = useRef();
  const theme = useTheme()


  const handleComment = async () => {

    const whole_comment = { ...comment, text: `${user?.result?.name}: ${newComment}` }

    setComments([...comments, whole_comment]);
    setComment({ ...comment, text: '' });
    setNewComment('');

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });

    await dispatch(commentPost(whole_comment, post?._id));

  };
  const handleLikesOfComments = async (c) => {

    const hasLikedComment = c?.likes?.find((like) => like === userId)
    if (hasLikedComment) {
      setComment((prev) => ({
        ...c, text: '',
        numLikes: prev.numLikes - 1
      }));
      setComments(comments.map(comment => comment.comment_id === c.comment_id ? { ...comment, likes: c?.likes?.filter((like) => like !== userId) } : comment))
    }
    else {
      setComment((prev) => ({
        ...c, text: '',
        numLikes: prev.numLikes + 1
      }));
      setComments(comments.map(comment => comment.comment_id === c.comment_id ? { ...comment, likes: [...c.likes, userId] } : comment))
    }
    await dispatch(likeComment(post._id, c.comment_id))


  }

  const handleDeleteComment = async (c) => {
    setComments(comments.filter((comment) => comment.comment_id !== c.comment_id))
    await dispatch(deleteComment(post._id, c.comment_id))
    console.log("deleted")
  }

  const handleEditComment = async (cc) => {

    setComments(comments.map(c => c.comment_id === cc.comment_id ?
      {
        ...c, text: `${user?.result?.name}: ${comment}`, isEdit: false
      } : c))

    await dispatch(editComment(post._id, cc.comment_id, {
      newComment: `${user?.result?.name}: ${comment}`
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

  const handlePressEditButton = (c) => {
    console.log(c)
    setComments(comments.map(comment => comment.comment_id === c.comment_id ?
      { ...comment, isEdit: true, text: c.text } : { ...comment, isEdit: false }))
    setComment({ ...comment, text: c?.text?.split(': ')[1] })
  }

  const handleCancelEdit = (c) => {
    console.log(c)
    setComments(comments.map(comment => comment.comment_id === c.comment_id ?
      { ...comment, isEdit: false, text: c.text } : comment))

  }


  return (
    <div>
      <Box sx={{ color: theme.palette.text.primary }}>
        <div className={classes.commentsOuterContainer}>
          <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6" style={{ margin: "10px 0px" }}>Comments</Typography>
            <Divider style={theme.palette.mode === 'light' ? { backgroundColor: 'aliceblue' } : { backgroundColor: '#bfbfbf' }} />
            <br />
            {comments?.map((c, i) => (
              <div key={i}>
                {!c.isEdit && (
                  <Typography key={i} gutterBottom variant="subtitle1">
                    <strong>{c?.text?.split(': ')[0]}:</strong>&nbsp;{c?.text?.split(': ')[1]}
                  </Typography>
                )}
                {(c.isEdit && userId) && (
                  <>
                    <Slide direction='right' in={c.isEdit} >
                      <div>
                        <TextField
                          id="outlined-multiline-flexible"
                          multiline
                          style={theme.palette.mode === 'dark' ? { color: "#32a1ce" } : {}}
                          value={comment ? comment?.text : c?.text?.split(': ')[1]}
                          onChange={(e) => { setComment(e.target.value) }}
                        />
                        <Button onClick={() => { handleCancelEdit(c) }} style={{ marginLeft: "5px" }}>
                          <CancelOutlinedIcon style={theme.palette.mode === 'dark' ? { color: "#32a1ce" } : {}} />
                        </Button>
                        <Button onClick={() => { handleEditComment(c) }} style={{ margin: "1px 5px" }}>
                          <DoneOutlinedIcon style={theme.palette.mode === 'dark' ? { color: "#32a1ce" } : {}} />
                        </Button>
                      </div>
                    </Slide>

                  </>
                )}
                {(!c.isEdit && userId) && (
                  (user?.result?.googleId === c?.creator || user?.result?._id === c?.creator) && (
                    <>
                      <Button size="small" color="primary" onClick={() => { handleLikesOfComments(c) }}>
                        <ViewLikes c={c} />
                      </Button>
                      <Button size="small" color="primary" onClick={() => { handlePressEditButton(c) }}>
                        <EditIcon />
                      </Button>
                      <Button size="small" color="secondary" onClick={() => {
                        handleDeleteComment(c)
                      }}>
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </>
                  )
                )}
                <Divider style={theme.palette.mode === 'light' ? { backgroundColor: 'aliceblue', margin: '10px 0px' } : { backgroundColor: '#bfbfbf', margin: '10px 0px' }} />
              </div>
            ))}

          </div>
          <div ref={commentsRef} />
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <textarea id="comment" name="story"
              rows="4" cols={isMobile ? "20" : "33"}
              value={newComment}
              placeholder={"Write a comment"}
              style={theme.palette.mode === 'light' ? { backgroundColor: 'aliceblue' } : { backgroundColor: '#bfbfbf' }}
              onChange={(e) => setNewComment(e.target.value)}
            >
            </textarea>
            <br />
            <Button style={{ marginTop: '10px', color: theme.palette.primary.main, backgroundColor: theme.palette.buttons.main }} fullWidth disabled={!newComment.length} color="primary" variant="contained" onClick={handleComment}>
              Comment
            </Button>
          </div>
        </div>
      </Box >
    </div >
  );
};

export default CommentSection;
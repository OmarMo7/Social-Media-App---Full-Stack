import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { Box } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { commentPost } from '../../actions/posts';
import { red } from "@mui/material/colors";

import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();
  const theme = useTheme()
  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post?._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Box sx={{ color: theme.palette.text.primary }}>
        <div className={classes.commentsOuterContainer}>
          <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6">Comments</Typography>
            {comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c.split(': ')[0]}</strong>
                {c.split(':')[1]}
              </Typography>
            ))}
            <div ref={commentsRef} />
          </div>
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField style={{ color: red }} fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
            <br />
            <Button style={{ marginTop: '10px', color: theme.palette.primary.main, backgroundColor: theme.palette.buttons.main }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
              Comment
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CommentSection;
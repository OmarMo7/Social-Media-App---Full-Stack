import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Chip, Divider, Button, Typography, ButtonBase } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { likePost, deletePost } from '../../../actions/posts';
import Zoom from '@mui/material/Zoom';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import Alert from '@mui/material/Alert';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();
  const theme = useTheme();
  const [likes, setLikes] = useState(post?.likes);
  const [postWarnings, setPostWarnings] = useState({ post_id: post._id, isWarned: false });
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === userId);

  const handleLikes = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = (e) => {
    navigate(`/posts/${post._id}`);
  };

  return (
      <Card className={classes.card} style={{ backgroundColor: theme.palette.card.main }} raised elevation={6}>
      <div style={{cursor: 'pointer'}} component="span" name="test" className={classes.cardAction} onClick={openPost}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        {post.tags.map((tag) => (
          <Chip key={tag} color='primary' label={`${tag}`} variant="outlined" style={{ margin: '1px' }} />
        ))}
      </div>
      <Divider variant="middle" />
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      </div>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLikes}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => setPostWarnings({ post_id: post._id, isWarned: true })}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
      {postWarnings.isWarned && (
        <Zoom in={postWarnings.isWarned} timeout={100}>
          <Alert sx={{ display: 'flex', height: postWarnings.isWarned ? '100px' : '0px' }} severity="warning">
            Are you sure you want to delete this comment?
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={() => { setPostWarnings({ ...postWarnings, isWarned: false }) }} style={{ marginLeft: '5px' }}>
                <CancelOutlinedIcon style={theme.palette.mode === 'dark' ? { color: '#32a1ce' } : {}} />
              </Button>
              <Button onClick={() => { dispatch(deletePost(postWarnings.post_id)) }} style={{ margin: '1px 5px' }}>
                <DoneOutlinedIcon style={theme.palette.mode === 'dark' ? { color: '#32a1ce' } : {}} />
              </Button>
            </div>
          </Alert>
        </Zoom>
      )}
    </Card>
  );
};

export default Post;

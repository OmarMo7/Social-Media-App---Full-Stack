import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider, Container } from '@material-ui/core'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom'
import useStyles from './styles'
import { getPost, getPostsBySearch } from '../../actions/posts'
import CommentSection from './CommentSection';


const PostDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()
  const classes = useStyles()
  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const { id } = useParams()

  const openPost = (_id) => {
    history.push(`/posts/${_id}`)
  }
  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  useEffect(() => {
    if (post) dispatch((getPostsBySearch({ search: 'none', tags: post?.tags.join(',') })))
  }, [post])

  if (!post) return null
  if (isLoading) {
    return (
      <div className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </div>
    );
  }

  const otherPosts = posts.filter(({ _id }) => post._id !== _id)
  document.title = post.title
  // const classs = document.getElementsByClassName('MuiPaper-elevation6')
  // console.log(classs)

  return (
    <Container maxWidth="xl">
      <Paper style={{ padding: '20px', borderRadius: '15px', backgroundColor: theme.palette.background.default }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Box sx={{ color: theme.palette.text.primary }}>
              <Typography variant="h3" component="h2" >{post.title}</Typography>
              <Typography gutterBottom variant="h6" color={"primary"} component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
              <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
              <Typography variant="h6">Created by: {post.name}</Typography>
              <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="body1">{post.messege}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
              <Divider style={{ margin: '20px 0' }} />
              <CommentSection post={post} />
              <Divider style={{ margin: '20px 0' }} />
            </Box>
          </div>
          <div className={classes.imageSection}>
            <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </div>
        </div>

        {
          otherPosts && (<div className={classes.section}>
            <Box sx={{ color: theme.palette.text.primary }}>
              <Typography gutterBottom variant='h5'> You might also like: </Typography>
              <Divider />
              <div className={classes.recommendedPosts}>
                {otherPosts.map((post) => (
                  <div style={{ margin: "20px", cursor: "pointer" }} onClick={() => { openPost(post._id) }} key={post._id} >
                    <Typography gutterBottom variant='h6'>{post.title}</Typography>
                    <Typography gutterBottom variant='body1'>{post.name}</Typography>
                    <Typography gutterBottom variant='body1'>{post.message}</Typography>
                    <Typography gutterBottom variant='h6'><ThumbUpAltOutlined fontSize="small" /> {post.likes.length}</Typography>
                    <img src={post.selectedFile} width={"100px"} />
                  </div>
                ))}
              </div>
            </Box>
          </div>)
        }
      </Paper>
    </Container>
  )
}

export default PostDetails
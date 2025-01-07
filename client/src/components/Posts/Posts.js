import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts?.length && !isLoading) {
    return 'You have no posts yet';
  }

  return (
    isLoading ? <CircularProgress /> : (
      <Box className={classes.container} display="flex" flexWrap="wrap" justifyContent="space-evenly" alignItems="stretch" gap={3}>
        {posts?.map((post) => (
          <Box key={post._id} flex="1 0 30%" display="flex" justifyContent="center">
            <Post post={post} setCurrentId={setCurrentId} />
          </Box>
        ))}
      </Box>
    )
  );
};

export default Posts;

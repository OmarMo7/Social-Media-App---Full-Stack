import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId, noResults }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (noResults) {
    return (
      <Typography variant="h6" align="center">
        Nothing matches your entry
      </Typography>
    );
  }

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

import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Post from './Post/Post';
import useStyles from './styles';

const setCircularProgress = (loading) => {
  return loading ? (<CircularProgress />) : (<div>
    You have no posts yet
  </div>);
}


const Posts = ({ setCurrentId }) => {
  const [loading, setLoading] = useState(true);
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [loading]);

  return (
    !posts.length ? setCircularProgress(loading) : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
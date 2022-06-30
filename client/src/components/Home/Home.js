import React, { useState, useEffect } from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import { useDispatch } from 'react-redux';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Paginate from "../Pagination/Pagination.jsx";
import useStyles from './styles'

const useQuery = () => {
  return new URLSearchParams(useLocation.search) // Not understood
}




const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery()
  const classes = useStyles()
  const history = useHistory()
  const page = query.get('page') || 1
  const searchQuery = query.get('search')
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const onKey = (e) => {
    if (e.keyCode === 13) {
      searchPost()
    }
  }

 

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name='search'
                variant="outlined"
                label="Search Posts"
                fullWidth
                onKeyDown={onKey}
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
              />
            </AppBar>
            <ChipInput
              style={{ margin: '10px 0' }}
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label="Search Tags"
              variant="outlined"
            />
            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
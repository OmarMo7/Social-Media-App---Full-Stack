import React, { useState, useEffect } from 'react';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { Container, Grow, Paper, AppBar, TextField, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';

import { getPostsBySearch } from '../../actions/posts';
import Paginate from "../Pagination/Pagination";
import useStyles from './styles';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = React.memo(({ theme }) => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const classes = useStyles();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [noResults, setNoResults] = useState(false); // New state to track search results
  const { posts } = useSelector((state) => state.posts); // Access posts from redux store
  const user = JSON.parse(localStorage.getItem("profile"));

  const onKey = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
        .then((response) => {
          setNoResults(!response.length); // Update noResults based on response
        });
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };

  // Update noResults whenever posts are updated
  useEffect(() => {
    setNoResults(!posts.length);
  }, [posts]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="stretch" className={classes.gridContainer} style={{ gap: '16px' }}>
          <Box flex={9} display="flex" flexDirection="column">
            <Posts setCurrentId={setCurrentId} noResults={noResults} />
          </Box>
          <Box flex={3} display="flex" flexDirection="column">
            <AppBar className={classes.appBarSearch} position="static" color="inherit" style={{ backgroundColor: theme.palette.form.main }}>
              <TextField
                name='search'
                variant="outlined"
                label="Search Posts"
                fullWidth
                onKeyDown={onKey}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Autocomplete
                multiple
                id="tags-filled"
                options={[]}  // Add your own options here if needed
                freeSolo
                value={tags}
                onChange={(event, newValue) => setTags(newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} variant="filled" label="Tags" placeholder="Add tags" />
                )}
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} userInfo={user} theme={theme} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6} style={{ backgroundColor: theme.palette.form.main }}>
                <Paginate page={page} />
              </Paper>
            )}
          </Box>
        </Box>
      </Container>
    </Grow>
  );
});

export default Home;

import React, { useState } from 'react';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { Container, Grow, Paper, AppBar, TextField, Button, Box } from '@mui/material'; // Updated import
import { useNavigate, useLocation } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import { useDispatch } from 'react-redux';

import { getPostsBySearch } from '../../actions/posts';
import Paginate from "../Pagination/Pagination";
import useStyles from './styles';

const useQuery = () => {
  return new URLSearchParams(useLocation().search); // Not understood
};

const Home = React.memo(({ theme }) => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const classes = useStyles();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('none');
  const [tags, setTags] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));

  const onKey = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="stretch" className={classes.gridContainer} style={{ gap: '16px' }}>
          <Box flex={9} display="flex" flexDirection="column">
            <Posts setCurrentId={setCurrentId} />
          </Box>
          <Box flex={3} display="flex" flexDirection="column">
            <AppBar className={classes.appBarSearch} position="static" color="inherit" style={{ backgroundColor: theme.palette.form.main }}>
              <TextField
                name='search'
                variant="outlined"
                label="Search Posts"
                fullWidth
                onKeyDown={onKey}
                value={search === 'none' ? '' : search}
                onChange={(e) => { setSearch(e.target.value); }}
              />
              <Chip
                style={{ margin: '10px 0' }}
                value={tags}
                onClick={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
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

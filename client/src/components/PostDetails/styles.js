import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    marginBottom: "10%",
    [theme.breakpoints.down('sm')]: {
      width: "80%",
    },
    [theme.breakpoints.up('sm')]: {
      width: "70%",
    },
    [theme.breakpoints.up('md')]: {
      width: "90%",
    },
  },
  multilineColor: {
    color: theme.palette.text.primary
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column-reverse',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    width: "100%"
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginBottom: "10px"
  }
}));

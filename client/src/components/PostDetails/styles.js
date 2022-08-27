import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '70%',
    left: '140px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      float: 'left',
      width: "40%",
    },
    [theme.breakpoints.up('sm')]: {
      float: 'left',
      width: "50%",
      marginBottom: "20%"
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
  imageSection: {
    right: '10%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
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
  commentsOuterContainer: {
    // display: 'flex',
    // justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginBottom: "10px"
  }
}));

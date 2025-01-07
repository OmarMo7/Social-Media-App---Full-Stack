import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "10px",
    alignItems: 'center',
    padding: '10px 10px 10px 10px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    fontFamily: 'Edu VIC WA NT Beginner, cursive'
  },
  image: {
    marginLeft: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.down('522')]: {
      display: "inline-grid",
      width: "130px"
    }
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    [theme.breakpoints.down('522')]: {
      display: "none"
    },
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  logout: {
    [theme.breakpoints.down('522')]: {
      padding: "5px 10px",
      fontSize: "12px",

    }
  }
}));
import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    marginTop: "10px",
    padding: '10px 10px 10px 10px',
  },
  brandLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
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
  },
  button: {
    display: 'flex',
    justifyContent: 'end',
    width: '10%',
  },
}));

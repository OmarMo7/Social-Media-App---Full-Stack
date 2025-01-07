import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  height: {
    minHeight: "100vh",
    bottom: "0"
  },
  darkModeButton: {
    width: "130px",
    padding: "5px 10px",
    borderRadius: "5px",
    margin: "20px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "inherit",
    fontSize: "0.75rem",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans- serif',
    fontWeight: "500",
    lineHeight: "1.75",
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
    textAlign: "center"
  }
}));
import React from 'react'
import Alert from '@mui/material/Alert';


const Error = ({ errorMessege }) => {

  // if (!errorMessege) {
  //   return (
  //     <div className={classes.loadingPaper}>
  //       <CircularProgress size="1em" />
  //     </div>
  //   );
  // }

  return (
    <div style={{ margin: "10px" }}>
      <Alert severity="error">{errorMessege}</Alert>
    </div>
  )
}

export default Error
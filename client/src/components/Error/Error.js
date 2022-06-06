import React from 'react'
import { Paper, Typography } from '@material-ui/core';

const Error = ({ errorMessege, classes }) => {
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant={'h6'} align='center'>
          {errorMessege}
        </Typography>
      </Paper>
    </div>
  )
}

export default Error
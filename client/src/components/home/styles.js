const styles = theme => ({
  loading: {
    marginTop: '25%',
    padding: theme.spacing.unit * 3,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '50%',
    margin: 'auto',
    [theme.breakpoints.down(350)]: {
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  paper: {
    width: '50%',
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: '100px',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  text: {
    padding: theme.spacing.unit * 3,
  },
});

export default styles;

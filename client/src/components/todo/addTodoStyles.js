const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  loading: {
    marginTop: '25%',
    padding: theme.spacing.unit * 3,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    padding: theme.spacing.unit * 3,
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '50px',
  },
  paper: {
    width: '90%',
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '40%',
    },
  },
  form: {
    width: '60%',
    margin: '0 auto',
  },
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    padding: theme.spacing.unit * 3,
  },
});

export default styles;

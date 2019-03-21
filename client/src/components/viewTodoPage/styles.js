const styles = theme => ({
  loading: {
    marginTop: '50%',
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up(700)]: {
      marginTop: '25%',
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '20%',
    },
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
  main: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '25px',
  },
  navIcons: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: '25px',
    paddingLeft: '50px',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    padding: theme.spacing.unit * 3,
  },
  description: {
    padding: theme.spacing.unit * 3,
  },
});

export default styles;

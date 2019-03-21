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
  todoBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '25px',
  },
  emptyPage: {
    height: '70vh',
    padding: theme.spacing.unit * 3,
  },
  gridItem: {
    padding: theme.spacing.unit * 3,
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    textDecoration: 'none',
  },
});

export default styles;

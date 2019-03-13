const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
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
  addTodoBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '25px',
    padding: theme.spacing.unit * 3,
  },
  emptyPage: {
    height: '70vh',
    padding: theme.spacing.unit * 3,
  },
  gridItem: {
    padding: theme.spacing.unit * 3,
  },
  text: {
    textDecoration: 'none',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export default styles;

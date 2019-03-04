const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  loading: {
    marginTop: '25%',
    padding: theme.spacing.unit * 3,
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

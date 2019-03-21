import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Assignment from '@material-ui/icons/Assignment';
import Paper from '@material-ui/core/Paper';
import Loader from '../loader/Loader';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import * as ROUTES from '../../constants/routes';
import styles from './styles';

const ViewTodoPage = props => {
  const { classes, authUser, loading, location } = props;
  const todo = { ...location.state };

  if (loading) {
    return <Loader className={classes.loading} size={80} />;
  }
  if (!authUser) {
    return <Redirect to={ROUTES.SIGNIN} />;
  }
  if (!location.state) {
    return <Redirect to={ROUTES.TODO_DASH} />;
  }

  return (
    <>
      <div className={classes.navIcons}>
        <IconButton component={Link} to={ROUTES.TODO_DASH}>
          <ArrowBack />
        </IconButton>
        <Assignment style={{ alignSelf: 'center' }} color="primary" />
      </div>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <div className={classes.buttonWrapper}>
            <Button
              component={Link}
              to={{
                pathname: `${location.pathname}/edit`,
                state: {
                  id: todo.id,
                  title: todo.title,
                  description: todo.description,
                },
              }}
              color="primary"
            >
              Edit
            </Button>
          </div>
          <div className={classes.title}>
            <Typography component="h6" variant="h6">
              {todo.title}
            </Typography>
            <Typography component="span" variant="caption">
              {moment(todo.createdAt).format('MM-DD-YYYY')}
            </Typography>
          </div>
          <Typography
            className={classes.description}
            component="p"
            variant="body1"
          >
            {todo.description}
          </Typography>
        </Paper>
      </main>
    </>
  );
};

ViewTodoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewTodoPage);

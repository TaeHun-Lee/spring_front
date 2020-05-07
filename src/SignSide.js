import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SignIn from './SignIn';
import SignUp from './SignUp';

const styles = (theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

class SignSide extends Component {

  urlCheck = (url) => {
    if(url === "/signUp")
      return(<SignUp history={this.props.history} __authInstanceCheck={this.props._authInstanceCheck} />);
    else
      return(<SignIn history={this.props.history} __authInstanceCheck={this.props._authInstanceCheck} />);
  };

    render(){
        const { classes } = this.props;
        return (
            <Grid container className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                  {this.urlCheck(this.props.url)}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SignSide);
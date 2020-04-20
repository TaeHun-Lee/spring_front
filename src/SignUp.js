import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const styles = theme =>( {
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const springUrl = "http://localhost:8080/testProject/user/userSignUp";


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId : '',
      userPw : '',
      userEmail : '',
      userAdd : '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      userId : this.state.userId,
      userPw : this.state.userPw,
      userEmail : this.state.userEmail,
      userAdd : this.state.userAdd
    }
    console.log(JSON.stringify(data));
    axios.post(springUrl, JSON.stringify(data), {
      headers : {
        'Content-Type' : 'application/json'
      }
    }).then(res=>{
      alert(res.data.Message);
    })
  }

  render() {
    const { classes } = this.props;
    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="userId"
                variant="outlined"
                required
                fullWidth
                id="userId"
                label="ID"
                autoFocus
                value={this.state.userId}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userPw"
                label="비밀번호"
                name="userPw"
                type="password"
                autoComplete="current-password"
                value={this.state.userPw}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userEmail"
                label="이메일 주소"
                name="userEmail"
                autoComplete="email"
                value={this.state.userEmail}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="userAdd"
                label="주소"
                id="userAdd"
                value={this.state.userAdd}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            회원가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                이미 가입하셨나요? 로그인
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    )
  }
}

export default withStyles(styles)(SignUp);
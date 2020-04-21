import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const springUrl = "http://localhost:8080/testProject/user/userSignIn";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId : '',
            userPw : '',
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
        }
        console.log(JSON.stringify(data));
        axios.post(springUrl, JSON.stringify(data), {
          headers : {
            'Content-Type' : 'application/json'
          },
          withCredentials : true,
        }).then(res=>{
            if(res.data.Message === "SignIn Success"){
                this.props.history.push('/Main');
            }
            else if (res.data.Message === "Already Signed In"){
                this.props.history.push('/Main');
            }
            else {
                alert("로그인 실패");
            }
        })
    }
    
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="userId"
                    label="ID"
                    name="userId"
                    autoFocus
                    value={this.state.userId}
                    onChange={this.handleChange}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="userPw"
                    label="비밀번호"
                    type="password"
                    id="userPw"
                    autoComplete="current-password"
                    value={this.state.userPw}
                    onChange={this.handleChange}
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="로그인 유지하기"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                    로그인
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to="/SignUp" variant="body2">
                            {"회원가입"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                    </Box>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(SignIn);
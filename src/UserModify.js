import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = (theme) => ({
    root: {
        margin: theme.spacing(5),
        '& .MuiTextField-root': {
            width: "100%",
        },
    },
    formEl: {
        margin: theme.spacing(2),
    },
    formButton: {
        margin: theme.spacing(1),
    },
});

const springUrl = "http://localhost:8090/spring/user/";
class UserModify extends Component {

    constructor(props){
        super(props);
        this.state = {
            userName : "",
            userPw : "",
            userEmail : "",
        };
    }

    componentDidMount(){
        const data = this.props.getUserInfo();
        this.setState({
            userName : data.userName,
            userEmail : data.userEmail,
        });
    }

    handleModify = (e) => {
        e.preventDefault();
        const data = {
            userName : this.state.userName,
            userPw : this.state.userPw,
            userEmail : this.state.userEmail,
        };
        axios.post(springUrl+"userModify/", data, {
            withCredentials : true,
            headers : {
                'Content-Type' : 'application/json'
            },
        }).then(res=>{
            if(res.data.AUTH === "Not Signed In") {
                alert("세션이 만료되어 로그인 상태가 아닙니다. 로그아웃 후 로그인 페이지로 전환합니다");
                this.props.__authInstanceCheck();
                this.props.history.replace("/");
            }
            else if(res.data.AUTH == null){
                alert("회원정보 수정에 실패하였습니다.");
            }
            else {
                axios.get(springUrl + "userSignOut/", {
                  withCredentials : true,
                }).then(res=>{
                  if(res.data.Message === "SignOut Success"){
                    axios.post(springUrl+"userSignIn/", data, {
                        headers : {
                          'Content-Type' : 'application/json',
                        },
                        withCredentials : true,
                      }).then(res=>{
                            if(res.data.AUTH){
                                this.props.__authInstanceCheck();
                                this.props.__authInstanceCheck(JSON.stringify(res.data.AUTH));
                                this.props.history.replace("/");
                            }
                            else {
                                alert("로그인 실패");
                            }
                        });
                    }
                });
            }
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <CssBaseline />
                <form className={classes.form} onSubmit={this.handleModify}>
                    <div className={classes.formEl}>
                        {/* <TextField name="albumName" variant="outlined" label="ID" required onChange={this.handleChange} value={this.state.albumName} /> */}
                        <TextField
                            name="userName"
                            variant="outlined"
                            required
                            fullWidth
                            id="userName"
                            label="ID"
                            autoFocus
                            value={this.state.userName}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className={classes.formEl}>
                        {/* <TextField name="albumDesc" variant="outlined" label="비밀번호" required type="password" onChange={this.handleChange} value={this.state.albumDesc} /> */}
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
                    </div>
                    <div className={classes.formEl}>
                        {/* <TextField name="albumDesc" variant="outlined" label="이메일" required onChange={this.handleChange} value={this.state.albumDesc} /> */}
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="userEmail"
                            label="이메일"
                            name="userEmail"
                            autoComplete="email"
                            value={this.state.userEmail}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className={classes.formEl}>
                        <Button className={classes.formButton} variant="contained" color="primary" onClick={this.props.history.goBack}>뒤로가기</Button>
                        <Button className={classes.formButton} variant="contained" type="submit" color="primary">제출</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(UserModify);
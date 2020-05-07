import React, {Component} from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import axios from 'axios';

const styles = (theme) => ({
      cardGrid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardContent: {
        flexGrow: 1,
      },
});

const springUrl = "http://localhost:8090/spring/";
class UserInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            userInfo : null,
        }
    }

    componentDidMount(){
        const data = this.props.getUserInfo();
        this.setState({
            userInfo : data
        });
    }

    handleBack = ()=>{
        this.props.history.replace("/");
    }

    handleModify = ()=>{
        this.props.history.replace("/userModify");
    }

    handleDelete = ()=>{
        axios.get(springUrl + "user/userDelete", {
            withCredentials : true,
        }).then(res=>{
            if(res.data.Message === "Delete Success"){
                alert("회원 탈퇴하였습니다.");
                this.props.__authInstanceCheck();
                this.props.history.replace("/");
            }
            else if(res.data.Message === "Delete Error"){
                alert("회원탈퇴 실패");
            }
            else if(res.data.Message === "Not Signed In") {
                alert("세션이 만료되어 로그인 상태가 아닙니다. 로그아웃 후 로그인 페이지로 전환합니다");
                this.props.__authInstanceCheck();
                this.props.history.replace("/");
            }
        });
    }

    render(){
        const { classes } = this.props;
        return(
            <React.Fragment>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {this.state.userInfo == null ?
                        <></> 
                        :
                        <Grid item xs={12}>
                            <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                ID : {this.state.userInfo.userName}
                                </Typography>
                                <Typography>
                                EMAIL : {this.state.userInfo.userEmail}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={this.handleBack}>
                                리스트로
                                </Button>
                                <Button size="small" color="primary" onClick={this.handleModify}>
                                수정
                                </Button>
                                <Button size="small" color="primary" onClick={this.handleDelete}>
                                삭제
                                </Button>
                            </CardActions>
                            </Card>
                        </Grid>
                        }
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(UserInfo);
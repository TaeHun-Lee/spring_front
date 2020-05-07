import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import axios from 'axios';
import UserInfo from './UserInfo';
import UserModify from './UserModify';
import AlbumList from './AlbumList';
import AlbumRegist from './AlbumRegist';
import AlbumDetail from './AlbumDetail';
import AlbumModify from './AlbumModify';

const styles = (theme) => ({
  appBar: {
    flexGrow : 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
});
const springUrl = "http://localhost:8090/spring/";
class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      registButton : "앨범 등록",
      albumDetail : null,
    }
  }

  handleLogout = () => {
    axios.get(springUrl + "user/userSignOut", {
      withCredentials : true,
    }).then(res=>{
      if(res.data.Message === "SignOut Success"){
        this.props._authInstanceCheck();
        this.props.history.push("/");
      }
    })
  }

  handleRegistButton = () => {
    if(this.state.registButton === "앨범 등록"){
      this.setState({
        registButton : "리스트로 돌아가기"
      });
      this.props.history.replace("/regist");
    }
    else {
      this.setState({
        registButton : "앨범 등록"
      });
      this.props.history.replace("/");
    }
  }

  getDetail = (detail) => {
    this.setState({
      albumDetail : detail,
    });
  }

  urlCheck = (url) => {
    if(url === "/userInfo")
      return(<UserInfo history={this.props.history} __authInstanceCheck={this.props._authInstanceCheck} getUserInfo={this.props.getUserInfo} />);
    else if(url === "/userModify")
      return(<UserModify history={this.props.history} __authInstanceCheck={this.props._authInstanceCheck} getUserInfo={this.props.getUserInfo} />);
    else if(url === "/regist")
      return(<AlbumRegist history={this.props.history} __authInstanceCheck={this.props._authInstanceCheck} handleRegistButton={this.handleRegistButton} />);
    else if(url === "/album/:albumId"){
      return(<AlbumDetail history={this.props.history} __authInstanceCheck={this.props._authInstanceCheck} detail={this.state.albumDetail}/>);
    }
    else if (url === "/albumModify/:albumId"){
      return(<AlbumModify history={this.props.history} __authInstanceCheck={this.props._authInstanceCheck} detail={this.state.albumDetail}/>);
    }
    else
      return(<AlbumList history={this.props.history} __authInstanceCheck={this.props._authInstanceCheck} _getDetail={this.getDetail} />);
  };

  clickUserInfo = () => {
    this.props.history.push("/userInfo");
  }

  render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
              <CssBaseline />
              <AppBar position="relative" className={classes.appBar}>
                <Toolbar>
                  <CameraIcon className={classes.icon} />
                  <Typography variant="h6" color="inherit" noWrap className={classes.appBar}>
                    개인 앨범
                  </Typography>
                  <Button color="inherit" onClick={this.clickUserInfo}>내 정보</Button>
                </Toolbar>
              </AppBar>
              {/* 헤드 유닛 */}
              <div className={classes.heroContent}>
                  <Container maxWidth="sm">
                      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                      앨범 목록
                      </Typography>
                      <Typography variant="h5" align="center" color="textSecondary" paragraph>
                      리눅스 서버를 이용하여 개인 앨범을 저장할 수 있습니다. 스토리징 서비스로 이용 가능합니다.
                      최대 크기는 10MB로 설정되어 있습니다.
                      </Typography>
                      <div className={classes.heroButtons}>
                      <Grid container spacing={2} justify="center">
                          <Grid item>
                          <Button variant="contained" color="primary" onClick={this.handleRegistButton}>
                            {this.state.registButton}
                          </Button>
                          </Grid>
                          <Grid item>
                          <Button variant="outlined" color="primary" onClick={this.handleLogout}>
                              로그아웃
                          </Button>
                          </Grid>
                      </Grid>
                      </div>
                  </Container>
              </div>
              {/* 헤드 유닛 끝 */}
              {this.urlCheck(this.props.url)}
              {/* Footer */}
              <footer className={classes.footer}>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                  과도한 용량 사용은 자제해주세요!
                </Typography>
              </footer>
              {/* End footer */}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Main);
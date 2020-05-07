import React, {Component} from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import axios from 'axios';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
});

const springUrl = "http://localhost:8090/spring/";
class Admin extends Component {
  constructor(props){
      super(props);
      this.state = {
          open : true,
          section : null,
          inLoading : false,
          userList : null,
          albumList : null,
      }
  }

  componentDidMount(){
    axios.get(springUrl+"user/userListForAdmin", {
        withCredentials : true,
    }).then(res=>{
        if(res.data != null){
            const list = res.data;
            this.setState({
                userList : list,
            });
        }
        axios.get(springUrl+"album/albumListForAdmin", {
            withCredentials : true,
            }).then(res=>{
                if(res.data != null){
                    const list = res.data;
                    this.setState({
                        albumList : list,
                        inLoading : true,
                    });
                }
        });
    });
  }

  handleDrawerOpen = () =>{
      this.setState({
          open : true,
      })
  }

  handleDrawerClose = ()=>{
      this.setState({
          open : false,
      })
  }

  hnadleUserManage = ()=>{
      this.setState({
          section : "USER",
      });
  }

  handleAlbumManage = ()=>{
      this.setState({
          section : "ALBUM",
      });
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

  handleUserDelete = (user)=>{
    axios.post(springUrl + "user/userDeleteForAdmin", user, {
        withCredentials : true,
    }).then(res=>{
        if(res.data.Message === "Delete Success"){
            const currentList = this.state.userList;
            const idx = currentList.findIndex(el=>el.userId === user.userId);
            if(idx > -1) currentList.splice(idx, 1);
            this.setState({
                userList : currentList,
            });
        }
    });
  }

  handleAlbumDelete = (album)=>{
      axios.post(springUrl + "album/delete", album, {
          withCredentials : true,
      }).then(res=>{
          if(res.data.Message === "Album Deleted"){
              const currentList = this.state.albumList;
              const idx = currentList.findIndex(el=>el.albumId === album.albumId);
              if(idx > -1) currentList.splice(idx, 1);
              this.setState({
                  albumList : currentList,
              });
          }
      });
  }

  renderForUser = ()=>{
    const { classes }  = this.props;
    const renderGrid = (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    유저관리
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>DELETE</TableCell>
                        </TableRow>
                    </TableHead>
                    {this.state.userList == null ? <></> :
                        this.state.userList.map((user, index)=>(
                            <TableBody key={index}>
                                <TableRow>
                                    <TableCell>{user.userId}</TableCell>
                                    <TableCell>{user.userName}</TableCell>
                                    <TableCell>{user.userEmail}</TableCell>
                                    <TableCell>{user.userSignedDate}</TableCell>
                                    <TableCell><Button variant="outlined" color="primary" onClick={e=>this.handleUserDelete(user)}>삭제</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        ))
                    }
                </Table>
            </Paper>
        </Grid>
      );
      return renderGrid;
  }

  renderForAlbum = ()=>{
    const { classes }  = this.props;
    const renderGrid = (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    앨범관리
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>OWNER</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>DESC</TableCell>
                            <TableCell>PICTURE</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>DELETE</TableCell>
                        </TableRow>
                    </TableHead>
                    {this.state.albumList == null ? <></> :
                        this.state.albumList.map((album, index)=>(
                            <TableBody key={index}>
                                <TableRow>
                                    <TableCell>{album.albumId}</TableCell>
                                    <TableCell>{album.albumUserId}</TableCell>
                                    <TableCell>{album.albumName}</TableCell>
                                    <TableCell>{album.albumDesc}</TableCell>
                                    <TableCell>{album.albumPictureName}</TableCell>
                                    <TableCell>{album.albumDate}</TableCell>
                                    <TableCell><Button variant="outlined" color="primary" onClick={e=>this.handleAlbumDelete(album)}>삭제</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        ))
                    }
                </Table>
            </Paper>
        </Grid>
      );
      return renderGrid;
  }

  renderSection = ()=>{
      const inLoading = this.state.inLoading;
      const section = this.state.section;
      let rendering = null;
      if(!inLoading)
        return rendering;
      if(section){
          if(section === "USER"){
            rendering = this.renderForUser();
          }
          else if(section === "ALBUM"){
            rendering = this.renderForAlbum();
          }
      }
      return rendering;
  }

  render(){
    const { classes }  = this.props;
    return (
        <div className={classes.root}>
          <CssBaseline />
          {/* 내비게이션 */}
          <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                관리창
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button onClick={this.hnadleUserManage}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="유저 관리" />
                </ListItem>
                <ListItem button onClick={this.handleAlbumManage}>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="앨범 관리" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={this.handleLogout}>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="로그아웃" />
                </ListItem>
            </List>
          </Drawer>
          {/* 내비게이션 바*/}
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                  {this.renderSection()}
              </Grid>
            </Container>
          </main>
        </div>
      );
  }
}

export default withStyles(styles)(Admin);
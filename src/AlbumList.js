import React, {Component} from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
      cardMedia: {
        paddingTop: '10%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
});

const springUrl = "http://localhost:8090/spring/";
class AlbumList extends Component{
    constructor(props){
      super(props);
      this.state = {
          albumList : null,
      }
    }
    componentDidMount(){
      axios.get(springUrl + "album/albumList", {
        withCredentials : true,
      }).then(res=>{
        if(res.data.AlbumList != null){
          this.setState({
            albumList : res.data.AlbumList,
          });
        }
        else if (res.data.Message === "Not Signed In"){
          alert("세션이 만료되어 로그인 상태가 아닙니다. 로그아웃 후 로그인 페이지로 전환합니다");
          this.props.__authInstanceCheck();
          this.props.history.replace("/");
        }
      });
    }
    handleDetail = (card) => {
      this.props._getDetail(card);
      this.props.history.push("/album/" + card.albumId);
    }
    render(){
        const { classes } = this.props;
        const imageStyle = {
            height: 100,
        };
        return(
            <React.Fragment>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {this.state.albumList == null ?
                        <></> 
                        :
                        this.state.albumList.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                          <Card className={classes.card}>
                            <CardMedia
                              className={classes.cardMedia}
                              title="Image title">
                              {/* <img src={'data:image/png;base64,' + card.albumImageByteData} style={imageStyle} alt="" /> */}
                              <img src={"http://localhost:8090" + card.albumPictureSource} style={imageStyle} alt=""/>
                              </CardMedia>
                            <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5" component="h2">
                              {card.albumName}
                              </Typography>
                              <Typography>
                              {card.albumDesc}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" color="primary" onClick={e=>this.handleDetail(card)}>
                              자세히
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                        ))}
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AlbumList);
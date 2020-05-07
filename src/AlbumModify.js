import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
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

const springUrl = "http://localhost:8090/spring/";
class AlbumModify extends Component {

    constructor(props){
        super(props);
        this.state = {
            albumName : "",
            albumDesc : "",
            albumPictureFile : null,
            albumPictureSource : null,
            albumId : null,
        };
    }

    componentDidMount(){
        this.setState({
            albumName : this.props.detail.albumName,
            albumDesc : this.props.detail.albumDesc,
            albumPictureSource : this.props.detail.albumPictureSource,
            albumId : this.props.detail.albumId,
        });
    }

    handleModify = (e) => {
        e.preventDefault();
        const data = {
            albumName : this.state.albumName,
            albumDesc : this.state.albumDesc,
            albumPictureFile : this.state.albumPictureFile,
            albumPictureSource : this.state.albumPictureSource,
            albumId : this.state.albumId,
        };
        if(data.albumPictureFile != null) {
            const formData = new FormData();
            formData.append("albumName", data.albumName);
            formData.append("albumDesc", data.albumDesc);
            formData.append("albumPictureFile", data.albumPictureFile);
            formData.append("albumPictureSource", data.albumPictureSource);
            formData.append("albumId", data.albumId);
            axios.post(springUrl+"album/modify", formData, {
                headers : {
                'Content-Type' : 'multipart/form-data'
                },
                withCredentials : true,
            }).then(res=>{
                if(res.data.Message === "Album Modified"){
                    this.props.history.replace("/");
                }
                else if(res.data.Message === "Album Modify Fail"){
                    alert("앨범 수정 실패");
                }
                else if(res.data.Message === "Not Signed In") {
                    alert("세션이 만료되어 로그인 상태가 아닙니다. 로그아웃 후 로그인 페이지로 전환합니다");
                    this.props.__authInstanceCheck();
                    this.props.history.replace("/");
                }
            });
        }
        else {
            axios.post(springUrl+"album/modify", data, {
                withCredentials : true,
                headers : {
                    'Content-Type' : 'application/json'
                },
            }).then(res=>{
                if(res.data.Message === "Album Modified"){
                    this.props.history.replace("/");
                }
                else if(res.data.Message === "Album Modify Fail"){
                    alert("앨범 수정 실패");
                }
                else if(res.data.Message === "Not Signed In") {
                    alert("세션이 만료되어 로그인 상태가 아닙니다. 로그아웃 후 로그인 페이지로 전환합니다");
                    this.props.__authInstanceCheck();
                    this.props.history.replace("/");
                }
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleFileChange = (e) => {
        this.setState({
            [e.target.name] : e.target.files[0]
        });
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <CssBaseline />
                <form className={classes.form} onSubmit={this.handleModify}>
                    <div className={classes.formEl}>
                        <TextField name="albumName" variant="outlined" label="앨범 이름" required onChange={this.handleChange} value={this.state.albumName} />
                    </div>
                    <div className={classes.formEl}>
                        <TextField name="albumDesc" variant="outlined" multiline rows={20} label="앨범 내용" onChange={this.handleChange} value={this.state.albumDesc} />
                    </div>
                    <div className={classes.formEl}>
                        <Input type="File" name="albumPictureFile" onChange={this.handleFileChange} />
                    </div>
                    <div className={classes.formEl}>
                        <Button className={classes.formButton} variant="contained" color="primary" onClick={this.props.history.goBack}>리스트로</Button>
                        <Button className={classes.formButton} variant="contained" type="submit" color="primary">제출</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(AlbumModify);
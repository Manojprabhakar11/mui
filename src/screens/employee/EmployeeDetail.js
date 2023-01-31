import { Backdrop, Box, Button, Card, CardContent, CircularProgress, Container, CssBaseline, makeStyles, Typography } from '@material-ui/core';
import React,{useEffect, useState} from 'react';
import { useNavigate,useLocation} from 'react-router-dom';

const useStyles=makeStyles(theme=>({
    logoutBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor:"rgb(252, 119, 119)",
        "&:hover":{
            backgroundColor:"rgb(255, 189, 189)"
        },
        margin:"1%",
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem"
           }
    },
    logoutBtnParent:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-end",
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem"
           }
    },
    label:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        width:"33%",
        justifyContent:"flex-end",
        display:"flex"

    },
    value:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        width:"50%",
        justifyContent:"flex-start",
        display:"flex",
        paddingLeft:"2%"
    },
    mainDetails:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
    },
    cardChild:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center",
        backgroundColor:"white",
        marginTop:"7%",
        padding:"5%"
    },
    header:{
        fontFamily: "'Itim', cursive",
        color:"#155995"
    },
    backdrop:{
        color: '#fff',
        zIndex:"100"
    },
}))

function EmployeeDetail() {
    const classes=useStyles();
    const [open,setOpen]=useState(false);
    const navigate=useNavigate();
    const storedValue=window.localStorage.getItem("value");
    const value=window.localStorage.getItem("hi");
    const passedDetail=useLocation();
    console.log(passedDetail,"detail")
    const logout=()=>{
        window.localStorage.clear();
        setOpen(true);
        setTimeout(()=>{
        setOpen(false)
        navigate("/");
        },300);
    }
    useEffect(() => {
        if(storedValue||value){
            return
        }
        else{
            navigate("/")
        }
    }, []);

    
    return (
        <CssBaseline>
            <Backdrop className={classes.backdrop}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
            </Backdrop>
            <Box className={classes.logoutBtnParent}>
                <Button className={classes.logoutBtn} onClick={logout}>LogOut</Button>
            </Box>
        <Container>
        <Card className={classes.cardChild}>
            {/* <CardContent className="cardChild"> */}
                    <Typography variant="h3" className={classes.header}>Profile Detail</Typography>
                    <CardContent className={classes.mainDetails}>
                        <Typography className={classes.label}>Name</Typography>
                        <Typography className={classes.value}>: {passedDetail.state.state.userName}</Typography>
                    </CardContent>
                    <CardContent className={classes.mainDetails}>
                        <Typography className={classes.label}>Age</Typography>
                        <Typography className={classes.value}>: {passedDetail.state.state.age}</Typography>
                    </CardContent>
                    <CardContent className={classes.mainDetails}>
                        <Typography className={classes.label}>Education</Typography>
                        <Typography className={classes.value}>: {passedDetail.state.state.education}</Typography>
                    </CardContent>
                    <CardContent className={classes.mainDetails}>
                        <Typography className={classes.label}>Field</Typography>
                        <Typography className={classes.value}>: {passedDetail.state.state.field}</Typography>
                    </CardContent>
            {/* </CardContent> */}
        </Card>
        </Container>
        </CssBaseline>
    )
} 



export default EmployeeDetail

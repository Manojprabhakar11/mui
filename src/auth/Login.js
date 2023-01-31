import { Backdrop, Button, Card, CardContent, CardMedia, CircularProgress, Container, TextField, Typography } from '@material-ui/core';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles=makeStyles(theme=>({
 loginHeader:{
     fontFamily: "'Itim', cursive",
    fontSize:"1.5rem",
     justifyContent:"center",
     alignItems:"center",
     textAlign:"center",
     height:"50px",
     AspectRatio:4/3,
     width:"50%",
     marginLeft:"25%"
 },
 Err:{
     fontFamily: "'Itim', cursive",
    fontSize:"1.5rem",
     color:"red",
     fontSize:"1.5rem",
     marginBottom:theme.spacing(2),
     [theme.breakpoints.down('xs')]: {
        fontSize:"1rem",
      }
 },
 textfield:{
     fontFamily: "'Itim', cursive",
    fontSize:"1.5rem",
    margin:theme.spacing(2),
    marginLeft:"0",
    marginBottom:"0",
    fontSize:"2rem"
 },
 loginBtn:{
     fontFamily: "'Itim', cursive",
     '&:hover':{
        backgroundColor: '#b9e7e3'
    },
    backgroundColor:"#7ce9df",
    marginTop:theme.spacing(3),
    marginBottom:theme.spacing(3),
    fontSize:"1.5rem"
 },
 loginCard:{
     fontFamily: "'Itim', cursive",
    fontSize:"1.5rem",
    //  justifyContent:"center",
    //  alignItems:"center",
    //  textAlign:"center",
     marginTop:"22%",
     width:"50%",
     marginLeft:"25%",
     [theme.breakpoints.down('sm')]: {
        width:"100%",
        marginLeft:"0"
      }
 },
 backdrop:{
    color: '#fff',
    zIndex:"100"
},
 }

))

function Login() {
    const classes=useStyles()

    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [emailError,setEmailError]=useState(false);
    const [passwordError,setPasswordError]=useState(false);
    const [open,setOpen]=useState(false);
    const navigate= useNavigate();
    const admin={
        email:"ganesh123@gmail.com",
        password:"Breeze@123",
        userName:"Ganesh",
        age:"23",
        education:"BE",
        field:"CSE"
    }
    const data=[
    {
        email:"manoj123@gmail.com",
        password:"Breeze@456",
        userName:"Manoj",
        age:"23",
        education:"BE",
        field:"civil"

    },
    {
        email:"bharath123@gmail.com",
        password:"Breeze@789",
        userName:"Bharath",
        age:"23",
        education:"BSc",
        field:"physics"
    }];
    const LoginCheck=(e)=>{
        e.preventDefault();
        console.log(password);
         console.log(userName)
        // const navigate = useNavigate();
        if(userName===admin.email&&password===admin.password){
            window.localStorage.setItem("value","yes");
            if(window.localStorage.getItem("value")){
                setOpen(true);
                setTimeout(()=>{
                setOpen(false);
                navigate("/foodorder",{state:admin});
            },300);
            }           
        }
        else if(userName===admin.email){
            setEmailError(false);
            // if(userName!==admin.email&&password!==admin.password){
            //     setEmailError(true);
            //     setPasswordError(true);
            // }
            // else if(userName!==admin.email){
            //     setEmailError(true);
            //     setPasswordError(false);
            // }
            if(password!==admin.password){
                setPasswordError(true);
            }
        }
        else if(userName!==admin.email){
        data.map((data)=>{
            console.log(data)
                if(userName===data.email && password===data.password){
                    window.localStorage.setItem("hi","yes");
                    if(window.localStorage.getItem("hi")){
                        navigate("/foodorder",{state:data})
                    }
                    // donot touch ++++++++++++++++++++++++++++++++++++
                    // if(window.localStorage.getItem("value")){
                    // navigate("/employeeDetail",{state:data});
                    // }+++++++++++++++++++++++++++++++++
                }
            });
                        if(userName!==data[0].email && userName!==data[1].email){
                            setEmailError(true);
                            if(password===data[0].password ||password===data[1].password){
                                if(password===data[0].password){
                                    setPasswordError(false);
                                    if(userName!==data[0].email){
                                        setEmailError(true);
                                    }
                                    else{
                                        setEmailError(false);
                                    }
                                }
                                else{
                                    if(password===data[1].password){
                                        setPasswordError(false);
                                        if(userName!==data[1].email){
                                            setEmailError(true);
                                        }
                                        else{
                                            setEmailError(false);
                                        }
                                    }
                                }
                            }
                            else{
                                setPasswordError(true); 
                            }
                        }
                        else if(userName===data[0].email ||userName===data[1].email){
                            if(userName===data[0].email){
                                setEmailError(false);
                                if(password!==data[0].password){
                                    setPasswordError(true);
                                }
                                else{
                                    setPasswordError(false);                                   
                                }
                            }
                            else{
                                if(userName===data[1].email){
                                    setEmailError(false);
                                    if(password!==data[1].password){
                                        setPasswordError(true);
                                    }
                                    else{
                                        setPasswordError(false); 
                                    }
                                }
                            }
                            
                        }
                        else if(password===data[0].password ||password===data[1].password){
                            if(password===data[0].password){
                                setPasswordError(false);
                                if(userName!==data[0].email){
                                    setEmailError(true);
                                }
                                else{
                                    setEmailError(false);
                                }
                            }
                            else{
                                if(password===data[1].password){
                                    setPasswordError(false);
                                    if(userName!==data[1].email){
                                        setEmailError(true);
                                    }
                                    else{
                                        setEmailError(false);
                                    }
                                }
                            }
                            
                        }
        }
        
    }
    
    return (
        <Container >
            <Backdrop className={classes.backdrop}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
            </Backdrop>
        <Card className={classes.loginCard} >
        <Container >
        <CardContent >
            <CardMedia image="https://experience.foodboss.com/content/images/2019/11/foodboss_logo_large.png" className={classes.loginHeader}/>
            {/* <Typography variant="h2" className={classes.loginHeader}>
            Login
            </Typography>  */}
        <TextField variant="outlined" className={classes.textfield} label="userName" onChange={(e) => setUserName(e.target.value)} fullWidth>
            {/* <input type="text" placeholder="userName" className="userNameInp" onChange={(e) => setUserName(e.target.value)}/> */}
        </TextField>
        {emailError && <Typography className={classes.Err}>*please enter valid email</Typography>}
        
        <TextField variant="outlined" type="password" className={classes.textfield}  label="password" onChange={(e) => setPassword(e.target.value)} fullWidth>
            {/* <input type="password" placeholder="password" className="PasswordInp" onChange={(e) => setPassword(e.target.value)}/> */}
        </TextField>
            {passwordError && <Typography passwordError={passwordError} className={classes.Err}>*please enter valid password</Typography>}
            <Button variant="contained"  className={classes.loginBtn} onClick={LoginCheck} fullWidth>Login</Button >
        </CardContent >
        </Container>
        </Card>
        </Container>
    
    )
}

export default Login

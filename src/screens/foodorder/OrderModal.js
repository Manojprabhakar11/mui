import { Button, Card, CardContent, CardMedia, Container, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';

const useStyles=makeStyles(theme=>({
    ordercontainer:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        backgroundColor: "black",
        justifyContent:"center",
        margin:"15%",
        padding:"5%",
        color:"white",
        [theme.breakpoints.down('xs')]: {
            width:"100%",
            margin:"0",
            marginTop:"20%"
          },
         
    },
    orderitems:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        textAlign:"center",
        backgroundColor: "black",
        margin:"2%",
        color:"white",
        boxShadow:"5px 5px 5px 5px #647274"
    },
    orderimg:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        aspectRatio:"6/3.5",
        width:"13%",
        display:"flex",
        borderRadius:"75%"
    },
    orderItem:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        fontSize:"1.5rem"
    },
    successmsg:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        alignItems:"center",
        textAlign:"center"
    },
    ordermsg:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        alignItems:"center",
        textAlign:"center",
        color:"red",
        
    },
    orderOkBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.3rem",
        backgroundColor: "rgb(164, 226, 188)",
        "&:hover":{
            backgroundColor:"rgb(199 227 210)"
        }
    }
}))

function OrderModal(props) {
    const classes=useStyles();
    const closeModal=()=>{
        props.closeOrderModal();
    }
    const showNotification=()=>{
        if(props.orderData.length!==0){
            props.showmsg();
        }
    }
    return (
        <Container onClick={closeModal}>
        <Card className={classes.ordercontainer}>
        {props.orderData.length!==0?<CardContent>
            {props.orderData.map(data=>{
                return <Card key={data.id} className={classes.orderitems}>
                    <CardMedia image={data.src}className={classes.orderimg}/>
                    <Typography className={classes.orderItem}>{data.item}*{data.noOfItem}</Typography>
                </Card>
            })}
            <Typography className={classes.successmsg}><CheckTwoToneIcon fontSize="1.2rem"/> order Successful</Typography>
        </CardContent>
        :<Typography className={classes.ordermsg}>no orders to show</Typography>}
        <Button className={classes.orderOkBtn} onClick={showNotification}>Ok</Button>
        </Card>
        </Container>
    )
}

export default OrderModal

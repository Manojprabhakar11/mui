import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import React, { memo, useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles=makeStyles(theme=>({
    itemProfile:{
        aspectRatio:5/3,
        width:"25%",
        marginLeft:"37.5%",
        borderRadius:"50%"
    },
    itemDescription:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center",
        marginTop:"2%",
        marginBottom:"2%",
        width:"50%",
        marginLeft:"25%",
        color:"white"
    },
    cardContainer:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        backgroundColor:"black",
        marginTop:"15%",
        Width:"80%",
        marginLeft:"5%",
        alignContent:"center"
    },
    noOfItems:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        display:"flex",
        alignItems:"center",
        color:"white"
    },
    itemDetail:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize:"1.3rem",
        color:"white",
        [theme.breakpoints.down('xs')]: {
            width:"35%",
            fontSize:"1rem"
          }
    },
    itemAddTo:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    AddToCartBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor:"rgb(164, 226, 188)",
        "&:hover":{
            backgroundColor:"rgb(199 227 210)"
        },
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem"
           }
    },
    cardActions:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        justifyContent:"center",
        alignItems: "center",
        textAlign: "center",
    },
    orderBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor:"rgb(164, 226, 188)",
        "&:hover":{
            backgroundColor:"rgb(199 227 210)"
        },
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem"
           }
    },
    ordercancel:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor:"rgb(255 87 87)",
        "&:hover":{
            backgroundColor:"rgb(239 147 147)"
        },
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem"
           }
    }
}));

function ItemModal(props) {
    // console.log(props);
    const [noOfItem,setNoOfItem]=useState(0);
    const [amount,setAmount]=useState(props.cartData[0].price);
    const classes=useStyles();

    const addHandler=useCallback(()=>{
        setNoOfItem(prevValue=>{
            return prevValue+1;
        });
        if(noOfItem>0){
            setAmount(prevValue=>{
                return prevValue+props.cartData[0].price;
            });
        }
    },[noOfItem]);
    const removeHandler=useCallback(()=>{
        if(noOfItem>0){
            if(noOfItem>1){
                setAmount(prevValue=>{
                return prevValue-props.cartData[0].price;
            });
            }
            else{
                setAmount(props.cartData[0].price);
            }
            setNoOfItem(prevValue=>{
                return prevValue-1;
            })
        }
        else{
            setNoOfItem(0);
            setAmount(props.cartData[0].price);
        }
    },[noOfItem]);
    const AddToCart=useCallback(()=>{
        if(noOfItem>0){
            props.noOfItemHandler(noOfItem,props.cartData[0]);
        }
    },[noOfItem]);
    // const cancelHandler=()=>{
    //     props.closeItemModal();
    // }
    return (
        <Container>
        <Card className={classes.cardContainer}>
            <CardContent>
            <CardMedia  className={classes.itemProfile} image={props.cartData[0].src}/>
            <Typography className={classes.itemDescription}>
                {props.cartData[0].des}
            </Typography>
            <Grid className={classes.noOfItems}>
                <Typography className={classes.itemDetail}>
               {`Rs.${amount}`}
                </Typography>
                <CardActions className={classes.itemAddTo}>
                <Button variant="outlined" className={classes.AddToCartBtn} onClick={removeHandler}>-</Button>
                <Typography >{noOfItem}</Typography>
                <Button variant="outlined" className={classes.AddToCartBtn} onClick={addHandler}>+</Button>
                </CardActions>
            </Grid>
            <CardActions className={classes.cardActions}>
                <Button variant="outlined" className={classes.ordercancel}onClick={()=>{props.closeItemModal()}}>cancel</Button>
                <Button variant="outlined" className={classes.orderBtn}  onClick={AddToCart}>AddToCart</Button>
            </CardActions>
            </CardContent>
        </Card>
        </Container>
    )
}
export default memo(ItemModal);
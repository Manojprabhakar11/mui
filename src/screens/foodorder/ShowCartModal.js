import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from '@material-ui/core';
import React, { memo, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles=makeStyles(theme=>({
    cartModal:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        fontSize: "1.5rem",
        backgroundColor: "rgb(0, 0, 0)",
        color:"white",
        margin:"7%",
        padding:"5%",
        [theme.breakpoints.down('xs')]: {
            width:"100%",
            marginTop:"10%",
            margin:"0"
          }
    },
    carts:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        backgroundColor:"black",
        marginBottom:"2%",
        color:"white",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        boxShadow:"5px 5px 5px 5px #647274",
        [theme.breakpoints.down('xs')]: {
            width:"100%",
          }
    },
    itemimg:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        aspectRatio:"6/3.5",
        width:"13%",
        display:"flex",
        borderRadius:"75%",
        [theme.breakpoints.down('xs')]: {
            width:"100%",
            aspectRatio:"2/2",
          }
    },
    cartModifier:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        
    },
    addToCartBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor:"rgb(164, 226, 188)",
        "&:hover":{
            backgroundColor:"rgb(199 227 210)"
        },
        [theme.breakpoints.down('xs')]: {
            fontSize:"0.5rem",
            width:"20%"
           }
    },
    item:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem",
          }
    },
    cartModalBtns:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center",
        [theme.breakpoints.down('xs')]: {
           fontSize:"1rem"
          }
    },
    orderBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor: "rgb(164, 226, 188)",
        "&:hover":{
            backgroundColor:"rgb(199 227 210)"
        },
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem"
           }
    },
    orderCancel:{
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
}))

function ShowCartModal(props) {
    const classes=useStyles();
    const [totalAmount,setTotalAmount]=useState(30);
    const incomingData=props.addedData;
    const [data,setData]=useState(incomingData);
    useEffect(()=>{
        // setData(props.addedData);
        data.map(data=>{
            return setTotalAmount(prevamt=>{
                return prevamt+data.amount;
            });
        });
    },[props.addedData])
    const addtionOfItem=(dataId)=>{
       const updatedNoofItem= data.map(data=>{
            if(data.id===dataId){
                // console.log(data.amount,data.price)
                data.amount=data.amount+data.price;
                setTotalAmount(prevamt=>{
                    return prevamt+data.price;
                })
                return {...data,noOfItem:++data.noOfItem,amount:data.amount};
            }
            else{
                return data;
            }
        });
        setData(updatedNoofItem);
    }
    // console.log(data,"data")
    const removeItem=(dataId)=>{
        const updatedNoofItem= data.map((datas)=>{
            if(datas.id===dataId){
                // console.log(datas.amount,datas.price)
                if(datas.amount>0){
                    datas.amount=datas.amount-datas.price;
                }
                setTotalAmount(prevamt=>{
                    if(prevamt>1){
                        return prevamt-datas.price;
                    }
                });
                if(datas.noOfItem>1){
                    return {...datas,noOfItem:--datas.noOfItem,amount:datas.amount};
                }
                else{
                  const removeddata=  data.filter(item=>{
                      return datas.id!==item.id
                  });
                  console.log(removeddata,"re")
                  setData(removeddata);
                  props.addInCart();
                // data=removeddata;
                }
            }
            else{
                return datas;
            }
        });
        // setData(updatedNoofItem);
    }
    const cancelModalHandler=()=>{
        props.cancelModal(data);
    }
    const placeOrder=()=>{
        // console.log(data,"cancel")
        props.orderplaced(data);
    }
    // console.log(data,"data");
    return (
        <Container>
        <Card className={classes.cartModal}>
            <CardContent>
            {data.length!==0?data.map(data=>{
                return <Card key={data.id}className={classes.carts}>
                    
                <CardMedia image={data.src} className={classes.itemimg}/>
                <Typography className={classes.item}>{data.item}</Typography>
                <CardActions className={classes.cartModifier}>
                <Button className={classes.addToCartBtn} onClick={()=>removeItem(data.id)}>-</Button>
                <Typography>{data.noOfItem}</Typography>
                <Button className={classes.addToCartBtn} onClick={()=>addtionOfItem(data.id)}>+</Button>
                </CardActions>
                </Card>
            }):<Typography className={classes.item}>no orders to show</Typography>
            }
            {data.length!==0&&
            <CardContent>
            <Typography className={classes.item}>delivery charge:Rs.30</Typography >
            <Typography className={classes.item}>{`Total Amount: Rs.${totalAmount}`}</Typography >
            </CardContent>
            }
            <CardActions className={classes.cartModalBtns}>
            <Button className={classes.orderCancel} onClick={cancelModalHandler}>cancel</Button>
            <Button className={classes.orderBtn} onClick={placeOrder}>order</Button>
            </CardActions>
            </CardContent>
        </Card>
        </Container>
    )
}

export default memo(ShowCartModal)

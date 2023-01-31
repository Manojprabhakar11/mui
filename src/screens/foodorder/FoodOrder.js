import React, { memo, useCallback, useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import ItemModal from "./ItemModal"
import ShowCartModal from "./ShowCartModal"
import OrderModal from "./OrderModal"
import {items} from "../../data/foodItemData"
import { AppBar, Avatar, Backdrop, Box, Button, Card, CardContent, CardMedia, CircularProgress, createTheme, CssBaseline, Drawer, FormControl, Grid, InputAdornment, makeStyles, Menu, MenuItem, Modal, Snackbar, TextField, Toolbar, Typography } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, ThemeProvider } from '@mui/material';


const fontStyle = createTheme({
  typography: {
    fontFamily: ['Itim',"cursive"].join(",")
  }
});
// const items=[{
//     id:1,
//     item:"Briyani",
//     origin:"South Indian",
//     price:150,
//     des:"biryani is a spiced mix of meat and rice, traditionally cooked over an open fire in a leather pot.",
//     src:"https://thumbs.dreamstime.com/b/hyderabadi-chicken-biryani-38473399.jpg"
// },
// {
//     id:2,
//     item:"Parotta",
//     origin:"North Indian",
//     price:15,
//     des:"Parotta or Porotta is a layered Indian and Sri Lankan flatbread made from Maida or Atta, alternatively known as flaky ribbon pancake",
//     src:"https://media.istockphoto.com/id/1205482203/photo/kerala-parotta-popularly-known-as-paratha-or-porotta-is-a-delicacy-from-the-state-of-kerala.jpg?s=612x612&w=0&k=20&c=Yv6GQkzNErLM7NUA4q6S27FnFMT7yuC6RSCij5e2m0Y="  
// },
// {
//     id:3,
//     item:"Chappathi",
//     origin:"North Indian",
//     price:10,
//     des:"a round flat unleavened bread of India that is usually made of whole wheat flour and cooked on a griddle",
//     src:"https://upload.wikimedia.org/wikipedia/commons/f/fe/2_Chapati_warm_and_ready_to_be_eaten.jpg"
// },
// {
//     id:4,
//     item:"Meals",
//     origin:"South Indian",
//     price:80,
//     des:"Delicious meals are tasty, appetizing, scrumptious, yummy, luscious, delectable, mouth-watering, fit for a king, delightful, lovely, wonderful, pleasant, enjoyable, appealing, enchanting, charming",
//     src:"https://c8.alamy.com/comp/2BMT9DP/kerala-style-fish-curry-meals-on-banana-leaf-2BMT9DP.jpg"
// },
// {
//     id:5,
//     item:"Dosa",
//     origin:"South Indian",
//     price:15,
//     des:"thin pancake in South Indian cuisine made from a fermented batter of ground black lentils and rice.",
//     src:"https://images.news18.com/ibnkhabar/uploads/2021/08/masala-dosa-recipe.jpg?im=FitAndFill,width=1200,height=675"
// },
// {
//     id:6,
//     item:"Cutlet",
//     origin:"Snacks",
//     price:10,
//     des:"have criify and delicious mouth watering cutlet",
//     src:"https://st2.depositphotos.com/1010148/7363/i/600/depositphotos_73634723-stock-photo-chicken-cutlets-in-breadcrumbs.jpg"
// }];
 function FoodOrder() {
    const classes=useStyles();
    const [ordersuccessModal,setOrderSuccessModal]=useState(false);
    const [addInCart,setAddInCart]=useState(0);
    const [currentModal,setCurrentModal]=useState(false);
    const [filteredData,setFilteredData]=useState("");
    const [addeddata,setAddedData]=useState([]);
    const [order,setOrder]=useState([]);
    const [onCartModal,setCartModal]=useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuBar,setMenuBar]=useState(false);
    const [avatar,setAvatar]=useState(false);
    const [data,setData]=useState(items);
    const [searchValue,setSearchValue]=useState("");
    const [open,setOpen]=useState(false);
    const [msg,setmsg]=useState(false);
    const navigate=useNavigate();
    const passedDetail=useLocation();
    console.log(passedDetail,"food")
    useEffect(() => {
        if(!window.localStorage.getItem("hi")&&!window.localStorage.getItem("value")){
            navigate("/");
        }
    }, [])

    const itemModal=useCallback((dataId)=>{
       const cartModal= items.filter(data=>{
            return data.id===dataId;
        });
        setOpen(true);
        setTimeout(()=>{
            setOpen(false)
            setCurrentModal(true);
            setFilteredData(cartModal);
        },250)
        
    },[items]);

    const noOfItemHandler=useCallback((noOfItem,cartData)=>{
        setAddedData(prevData=>{
            const existingData=prevData.filter(data=>{
                return cartData.id===data.id;
            });
            console.log(existingData,"alreadythere");
            if(existingData.length!==0){
                return prevData.map(data=>{
                    if(data.id===cartData.id){
                        return {...data,noOfItem:data.noOfItem+noOfItem,amount:data.amount+noOfItem*cartData.price}
                    }
                    else{
                        return data;
                    }
                })
            }
            else{
                return [...prevData,{...cartData,noOfItem:noOfItem,amount:noOfItem*cartData.price}];
            }
        });
        // console.log(addeddata,"incart")
       const filteredData=  addeddata.filter(data=>{
            return data.id===cartData.id;
        });
        if(filteredData.length===0){
            setAddInCart(prevCount=>
                {
                    return prevCount+1;
                });
        }
        console.log(addeddata,"incart")
        setCurrentModal(false);
    },[addInCart]);

    console.log(addeddata,"incart2")

    const cartDetail=useCallback(()=>{
        console.log(addeddata)
        setOpen(true);
        setTimeout(()=>{
            setOpen(false);
            setCartModal(true);
            setOrderSuccessModal(false);
            setCurrentModal(false);
            setAvatar(false);
            setMenuBar(false)
        },250)
    },[filteredData]);

    const logout=()=>{
        window.localStorage.clear();
        setOpen(true);
        setTimeout(()=>{
        setOpen(false);
        navigate("/");
        setAvatar(false);
        setMenuBar(false)
    },300);
    }
    
    const removeAddInCart=()=>{
        setAddInCart(prevCount=>{
            return prevCount-1;
        });
    }
    const cancelCartModal=(data)=>{
        setCartModal(false);
        setAddedData(data);
        
        setOrderSuccessModal(false);
    }
    const orderSuccess=(data)=>{
        setOpen(true);
        setTimeout(()=>{
        setOpen(false);
        setCartModal(false);
        setOrderSuccessModal(true);
        setOrder(data);
        setAddedData([]);
        setAddInCart(0);
        },300);
    }
    const showOrderModal=()=>{
        setOpen(true);
        setTimeout(()=>{
            setOpen(false);
            setOrderSuccessModal(true);
            setCurrentModal(false);
            setAvatar(false);
            setMenuBar(false)
        },250)
    }
    const handleOpen=(e)=>{
        setAnchorEl(e.currentTarget);
        setMenuBar(true)
    }
    const handleAvatarOpen=(e)=>{
        setAnchorEl(e.currentTarget);
        setAvatar(true);
    }
    const profile=()=>{
        setOpen(true);
        setTimeout(()=>{
        setOpen(false);
        if(window.localStorage.getItem("hi")||window.localStorage.getItem("value")){
            navigate("/employeeDetail",{state:passedDetail})
        }
    },300);
    }

    const handleClose=()=>{
        setAnchorEl(null);
        setAvatar(false);
        setMenuBar(false)
    };

    const msgpop=()=>{
        setmsg(true);
        setTimeout(()=>{
            setmsg(false);
        },1000);
    };
    const employeeDetail=()=>{
        setOpen(true);
        setTimeout(()=>{
        setOpen(false);
        if(window.localStorage.getItem("value")){
            navigate("/profile");
            }
        setAvatar(false);
        setMenuBar(false)
        },300)
    }

    const searchItem=(e)=>{
        let item=e.target.value;
        setSearchValue(item);
        const searchedItem=items.filter(data=>{
            if(data.item.toLowerCase().includes(item)){
                return data;
            }
        });
        if(searchedItem.length!==0){
            return setData(searchedItem);
        }else{
            if(item.trim()===""){
                setData(items);
            }
        }
    }
    // const closeOrderModal=()=>{
    //     setOrderSuccessModal(false);   
    // }
    // const closeItemModal=()=>{
    //     setCurrentModal(false);
    // }

    return (
        <ThemeProvider theme={fontStyle}>
        <CssBaseline >
            {/* {currentModal&&<ItemModal noOfItemHandler={(noOfItem,cartData)=>{noOfItemHandler(noOfItem,cartData)}} closeItemModal={()=>{setCurrentModal(false)}} cartData={filteredData} />} */}
            {/* {onCartModal&&<ShowCartModal addedData={addeddata} orderplaced={(data)=>orderSuccess(data)} addInCart={removeAddInCart} cancelModal={(data)=>cancelCartModal(data)}></ShowCartModal>} */}
            {/* {ordersuccessModal&&<OrderModal orderData={order} closeOrderModal={()=>{setOrderSuccessModal(false)}}/>} */}
            <Backdrop className={classes.backdrop}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={msg} autoHideDuration={6000} anchorOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }} className={classes.successmsg} >
            <Alert severity="success">Order Successful</Alert>
            </Snackbar>
            <Modal open={currentModal} aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description">
                <Box border="0" justifyContent="center" alignItems="center" textAlign="center">
                    <ItemModal noOfItemHandler={(noOfItem,cartData)=>{noOfItemHandler(noOfItem,cartData)}} 
                    closeItemModal={()=>{setCurrentModal(false)}} cartData={filteredData} />
                </Box>
            </Modal>
            
            <AppBar className={classes.navbar} position="sticky" >
                <CardMedia image="https://experience.foodboss.com/content/images/2019/11/foodboss_logo_large.png"
                         className={classes.loginHeader} onClick={()=>{window.location.reload()}}/>
                <Toolbar className={classes.toolbar}>
                    <Button variant="contained" className={classes.orderBtn} onClick={showOrderModal}><AddAlertIcon/> YOUR ORDER</Button>
                        <Modal open={ordersuccessModal} aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description">
                            <Box border="0" justifyContent="center" alignItems="center" textAlign="center">
                                <OrderModal orderData={order} closeOrderModal={()=>{setOrderSuccessModal(false)}} showmsg={msgpop}/>
                            </Box>
                        </Modal>
                    <Button variant="contained" className={classes.cartbtn} onClick={cartDetail}><ShoppingCartIcon/> YOUR CART {addInCart}</Button>
                        <Modal open={onCartModal} aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description">
                            <Box border="0" justifyContent="center" alignItems="center" textAlign="center">
                                <ShowCartModal addedData={addeddata} orderplaced={(data)=>orderSuccess(data)} 
                                                addInCart={removeAddInCart} cancelModal={(data)=>cancelCartModal(data)}></ShowCartModal>
                            </Box>
                        </Modal>
                    {/* <Button variant="contained" className={classes.logoutBtn} onClick={logout}>Logout</Button> */}
                        <Avatar className={classes.avatar} onClick={handleAvatarOpen} >{passedDetail.state.userName[0]}</Avatar>
                            <Menu   id="menu-appbar"
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    open={avatar} 
                                    anchorOrigin={{
                                        vertical: 'top',
                                        top:"0",
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }} 
                                    className={classes.popup}>
                                <MenuItem>
                                    <CloseIcon textalign="right" onClick={()=>{setAvatar(false);
                                                                    setMenuBar(false)}}></CloseIcon>
                                </MenuItem>
                                {passedDetail.state.userName==="Ganesh"&&<MenuItem>
                                <Typography textalign="center" onClick={employeeDetail} className={classes.menuList}>EmployeeDetail</Typography></MenuItem>}
                                <MenuItem>
                                    <Typography textalign="center" onClick={profile} className={classes.menuList}>{passedDetail.state.userName}</Typography>
                                </MenuItem>
                                <MenuItem><Typography textalign="center" onClick={logout} className={classes.menuList}>Logout</Typography></MenuItem>
                            </Menu>
                </Toolbar>
                <Toolbar className={classes.menuIcon}>
                        <MenuIcon onClick={handleOpen} />
                        <Menu id="menu-appbar" 
                                anchorOrigin={{
                                    vertical: 'top',
                                    top:"0",
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    top:"0",
                                    horizontal: 'right',
                                }}
                                open={menuBar}
                                anchorEl={anchorEl}
                                className={classes.popup}
                        >
                            <MenuItem>
                                <CloseIcon textalign="right" onClick={()=>{setAvatar(false);
                                                                            setMenuBar(false)}}></CloseIcon>
                            </MenuItem>
                            <MenuItem>
                                <Typography textalign="center" onClick={showOrderModal} className={classes.menuList}>your order</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography textalign="center" onClick={cartDetail} className={classes.menuList}>your Cart</Typography>
                            </MenuItem>
                            {passedDetail.state.userName==="Ganesh"&&<MenuItem>
                                <Typography textalign="center" onClick={employeeDetail} className={classes.menuList}>EmployeeDetail</Typography></MenuItem>}
                            <MenuItem>
                                <Typography textalign="center" onClick={profile} className={classes.menuList}>{passedDetail.state.userName}</Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography textalign="center" onClick={logout} className={classes.menuList}>logout</Typography>
                            </MenuItem>
                        </Menu>
                </Toolbar>
            </AppBar>
            <Box onClose={handleClose}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" >
                    <TextField 
                        margin="normal"
                        variant="outlined"
                        onChange={searchItem}
                        value={searchValue}
                        
                        InputProps={{startAdornment:
                        <InputAdornment position="start" >
                            <SearchIcon/>
                        </InputAdornment>}}
                        placeholder="searchItems..."
                        className={classes.searchField}
                    />
                </FormControl>
            </Box>
            <Grid container spacing={2} className={classes.menuItems} onClose={handleClose}>
            {data.map(data=>{
                return <Grid item key={data.id} onClick={()=>itemModal(data.id)} xs={12} sm={6} md={4} xl={4} lg={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cartContent}>
                            <Typography className={classes.cardItems}>{data.origin}</Typography>
                            <CardMedia className={classes.itemProfile} image={data.src}/>
                            <Grid className={classes.itemDetail}>
                                <Typography className={classes.cardItems}>{data.item}</Typography>
                                <Typography className={classes.cardItems}>{`Rs.${data.price}`}</Typography>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid >
            })}
            </Grid>
        </CssBaseline>
        </ThemeProvider>
    )
}
export default memo(FoodOrder);

const useStyles=makeStyles(theme=>({
    navbar:{
        justifyContent:"space-between",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"black",
        // marginBottom:theme.spacing(2),
        top:"0",
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
    },
    logoutBtn:{
        backgroundColor:"rgb(252, 119, 119)",
        '&:hover':{
            backgroundColor:"rgb(249 211 211)"
        },
        marginRight:theme.spacing(2),
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
    },
    orderBtn:{
        backgroundColor: "rgb(121, 85, 85)",
        '&:hover':{
            backgroundColor:"rgb(187 136 136)"
        },
        marginRight:theme.spacing(2),
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        
    },
    cartbtn:{
        backgroundColor: "rgb(164, 226, 188)",
        '&:hover':{
            backgroundColor:"rgb(213 247 226)"
        },
        marginRight:theme.spacing(2),
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
    },
    title:{
        marginLeft:"2%",
        color:"#8492df",
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
    },
    menuItems:{
        // fontSize:"2rem",
        width:"99%",
        marginLeft:"0.5%",
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
    },
    cardItems:{
        fontSize:"1.5rem",
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
    },
    itemDetail:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
    },
    cartContent:{
        paddingBottom:"18px",
        fontSize:"1.5rem",
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        // backgroundColor:"rgb(153, 203, 218)"
    },
    itemProfile:{
        aspectRatio:4/2.3
    },
    avatar:{
        backgroundColor: deepPurple[500]
    },
    toolbar:{
        display:"flex",
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        [theme.breakpoints.down('sm')]: {
            display:"none",
          }
    },
    menuIcon:{
        display:"none",
        [theme.breakpoints.down('sm')]: {
            display:"flex",
          },
        color:"white"
    },
    popup:{
        marginTop:"3%"
    },
    searchField:{
        color:"black",
        border:"black",
        // marginLeft:"9px",
        marginBottom:"15px",
        backgroundColor:"white",
        borderRadius:"5px",
        marginLeft:"15px",
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        
    },
    card:{
        borderRadius:"15px"
    },
    backdrop:{
        color: '#fff',
        zIndex:"100"
    },
    successmsg:{
        zIndex:"100%",
        top:"25",
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",

    },
    loginHeader:{
        height:"63px",
        AspectRatio:4/3,
        width:"300px",
        [theme.breakpoints.down('sm')]: {
            width:"50%",
          }
    },
    menuList:{
        fontFamily: "'Itim', cursive",
    }
}));
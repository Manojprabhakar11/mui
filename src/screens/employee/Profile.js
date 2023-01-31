import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AddEmployeeForm from "./AddEmployeeForm"
import { Backdrop, Box, Button, ButtonGroup, CircularProgress, CssBaseline, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const useStyles=makeStyles(theme=>({
    logoutBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor: "rgb(252, 119, 119)",
        "&:hover":{
            backgroundColor:"rgb(252, 176, 176)"
        },
        margin:"1%"
    },
    buttongrp:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        alignItems:"center",
        justifyContent:"flex-end",
        display:"flex",
    },
    addEmployeeBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor: "rgb(106, 199, 241)",
        "&:hover":{
            backgroundColor:"rgb(178, 226, 248)"
        },
        margin:"1%"
    },
    tableHeader:{
        fontFamily: "'Itim', cursive",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center",
        fontSize:"1.5rem"
    },
    tableData:{
        fontFamily: "'Itim', cursive",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center",
        fontSize:"1.1rem"
    },
    actions:{
        justifyContent: "center",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        textAlign:"center"
    },
    ErrorPopUp:{
        fontSize:"1.5rem",
        color:"red",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
    },
    editBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor:"mediumseagreen",
        "&:hover":{
            backgroundColor:"rgb(129, 219, 169)"
        },
        marginBottom:"1%",
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem"
           }
    },
    deleteBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor:"rgb(252, 144, 125)",
        "&:hover":{
            backgroundColor:"rgb(243, 191, 182)"
        },
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem"
           }
    },
    formContent:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        overflowY:"scroll"
    },
    backdrop:{
        color: '#fff',
        zIndex:"100"
    },
}))

function Profile() {
    const classes=useStyles();
    const [employeeDetail,setEmployeeDetail]=useState(localStorage.getItem('datas')?JSON.parse(localStorage.getItem('datas')):[]);
    const [addOptions,setAddOptions]=useState(false);
    const [formModal,setFormModal]=useState(false);
    const [editFormModal,setEditFormModal]=useState(false);
    const [editData , setEditdata] = useState('');
    const [open,setOpen]=useState(false);
    // const recievedData=window.localStorage.getItem("data")?JSON.parse(window.localStorage.getItem("data")):[];
    useEffect(() => {
        if(!storedValue){
            navigate("/");
        }
        setEmployeeDetail(localStorage.getItem('datas')?JSON.parse(localStorage.getItem('datas')):[])
    },[])
    // employeeDetail.map((e)=>{
        // console.log(employeeDetail.length);
    // })
    const navigate=useNavigate();
    const storedValue=window.localStorage.getItem("value");
    const logout=()=>{
        window.localStorage.clear();
        setOpen(true);
        setTimeout(()=>{
        setOpen(false)
        navigate("/");
        },300);
    }
    const addActions=(dataId)=>{
        console.log(dataId,"addoptions");
        employeeDetail.map(data=>{
            console.log(data,"mapped")
            console.log(data.id===dataId)
           return  data.id===dataId?setAddOptions(true):"";
        })
        
    }
    const editHandler=(dataId)=>{
        setOpen(true);
        setTimeout(()=>{
        setOpen(false)
        setEditFormModal(true);
        setAddOptions(false);
        setFormModal(false);
        },250);
        const findDataForEdit=employeeDetail.filter(data=>{
            if(data.id===dataId){
                console.log(data,"edithand")
             return  data;
             
            }
        });
        console.log(findDataForEdit,"filtered2")
        setEditdata(findDataForEdit);
        // console.log(findDataForEdit,"filtered1")
        // const filteredData=employeeDetail.filter(data=>{
        //     return findDataForEdit.filter(findData=>{
        //         console.log(findData.id===data.id,"check");
        //         return findData.id===data.id;
        //         //  if(findData.id===data.id){
        //         //      return data;
        //         //  }
        //         //  else{
        //         //      return;
        //         //  }
        //     });
        // };
        // if(editFormModal===true){
        //     console.log(findDataForEdit , '1');
        // <AddEmployeeForm employeeInfo={findDataForEdit}/>
        // }
         
    }
    const editedData=((data)=>{
        const recievedData=localStorage.getItem('datas')?JSON.parse(localStorage.getItem('datas')):[];
        console.log(data,"updated");
       const updatedDetail= recievedData.map((oldData,i)=>{
            if(oldData.id===data.id){
                return oldData={
                        firstName:data.firstName,
                        lastName:data.lastName,
                        id:data.id,
                        number:data.number,
                        employeeId:data.employeeId,
                        address:data.address,
                        qualification:data.qualification,
                        status:data.status
                };
                // return {firstName : data.firstName,
                //         lastName:data.lastName,
                //         id:data.id,
                //         employeeId:data.employeeId,
                //         address:data.address,
                //         qualification:data.qualification,
                //         status:data.status
                // }
            }
            else{
                return oldData;
            }
        });
        console.log(updatedDetail,"updatedDetail");
        localStorage.setItem("datas",JSON.stringify(updatedDetail));
        setEmployeeDetail(localStorage.getItem('datas')?JSON.parse(localStorage.getItem('datas')):[]);
        console.log(employeeDetail,"detail")
        
    //    const replacedDetail= recievedData.find(oldData=>{
    //       return oldData.id===data.id
    //    }).replace(updatedDetail);
    //    console.log(replacedDetail) 
    });

    const deleteHandler=(dataId)=>{
        const updatedData=employeeDetail.filter(data=>{
            return data.id!==dataId;
        });
        localStorage.setItem('datas',JSON.stringify(updatedData));
        setOpen(true);
        setTimeout(()=>{
        setOpen(false)
        setEmployeeDetail(updatedData);
        // window.localStorage.setItem("data",JSON.stringify(employeeDetail));
        setAddOptions(false);
        },200);
    }
    const ShowModal=()=>{
        setOpen(true);
        setTimeout(()=>{
        setOpen(false)
        setFormModal(true);
        setEditFormModal(false);
        },300)
    }
    const cancelHandler=()=>{
        setFormModal(false);
        setEditFormModal(false);
    }
    const triggerCloseModal=()=>{
        cancelHandler();
        setEmployeeDetail(localStorage.getItem('datas')?JSON.parse(localStorage.getItem('datas')):[]);
    }
    const employeeData=(data=>{
        const recievedData=localStorage.getItem('datas')?JSON.parse(localStorage.getItem('datas')):[];
        recievedData.push(data);
        console.log(data,"incoming");
        localStorage.setItem("datas",JSON.stringify(recievedData));
        setEmployeeDetail(localStorage.getItem('datas')?JSON.parse(localStorage.getItem('datas')):[]);
        console.log(employeeDetail,"detail")
    //    window.localStorage.setItem("data",JSON.stringify(employeeDetail));
    //    const recievedData=JSON.parse(window.localStorage.getItem("data"))
    //    setEmployeeDetail(recievedData);
        // setEmployeeDetail(prevData=>{
        //     return [...prevData,data]
        // })
    })
    return (
        <CssBaseline>
            {/* {editFormModal && <AddEmployeeForm employeeInfo={editData} cancelHandler={triggerCloseModal} employeeInfoUpdated={editedData}/> } */}
            {/* {formModal&&<AddEmployeeForm cancelHandler={triggerCloseModal} employeeData={employeeData}/>} */}
            <Backdrop className={classes.backdrop}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
            </Backdrop>
            <Modal open={editFormModal} aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" className={classes.formContent}>
                <Box >
                    <AddEmployeeForm employeeInfo={editData} cancelHandler={triggerCloseModal} employeeInfoUpdated={editedData} className={classes.formContent}/>
                </Box>
            </Modal>
            <Modal open={formModal} aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" className={classes.formContent}>
                <Box >
                    <AddEmployeeForm cancelHandler={triggerCloseModal} employeeData={employeeData} className={classes.formContent}/>
                </Box>
            </Modal>
            <Box className={classes.buttongrp}>
                <Button className={classes.logoutBtn} onClick={logout}>LogOut</Button>
            </Box>
            <Box className={classes.buttongrp}>
                <Button className={classes.addEmployeeBtn} onClick={ShowModal}>Add employee</Button>
            </Box>
            {employeeDetail.length!==0 ?
            <TableContainer >
                <Table>
                    <TableHead >
                    <TableRow >
                        <TableCell className={classes.tableHeader} align="center">Name</TableCell>
                        <TableCell className={classes.tableHeader} align="center">Number</TableCell>
                        <TableCell className={classes.tableHeader} align="center">Status</TableCell>
                        <TableCell className={classes.tableHeader} align="center">EmployeeId</TableCell>
                        <TableCell className={classes.tableHeader} align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {employeeDetail.length!==0&& employeeDetail.map(data=>{
                       return <TableRow key={data.id}>
                                <TableCell align="center" className={classes.tableData}>{`${data.firstName} ${data.lastName}`}</TableCell>
                                <TableCell align="center" className={classes.tableData}>{data.number}</TableCell>
                                <TableCell align="center" className={classes.tableData}>{data.status}</TableCell>
                                <TableCell align="center" className={classes.tableData}>{data.employeeId}</TableCell>
                                <TableCell  align="center" className={classes.tableData}>{addOptions===false?<MoreVertIcon key={data.firstName} onClick={()=>{addActions(data.id)}}/>:
                                    <ButtonGroup className={classes.actions}>
                                        <Button className={classes.editBtn} onClick={()=>editHandler(data.id)} key={data.employeeId}>edit</Button>
                                        <Button className={classes.deleteBtn} onClick={()=>deleteHandler(data.id)}key={data.number}>delete</Button>
                                    </ButtonGroup>}
                                </TableCell>
                            </TableRow>
                    })}
                    </TableBody>
                </Table>
            </TableContainer>:
            <Typography className={classes.ErrorPopUp}>
                No details to show
            </Typography>
                }
                
                
        </CssBaseline>
                
    )
}

export default Profile

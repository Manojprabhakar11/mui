import React from 'react'
import {useState} from "react"
import { Backdrop, Box, Button,  Card, CardContent, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
// import EmployeeDetail from './EmployeeDetail';
import { makeStyles } from '@material-ui/core/styles';

const useStyles=makeStyles(theme=>({
    formParent:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        backgroundColor:"white",
        marginTop:"5%",
        padding:"5%",
        // overflowY:"scroll",
        
    },
    formHeader:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
    },
    phNo:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        pattern:"[0-9]{10}",
        maxLines:"9999999999"
    },
    formAdd:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
    },
    formAddBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor:"mediumseagreen",
        "&:hover":{
            backgroundColor:"rgb(116, 228, 166)"
        },
        margin:"2%",
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem"
           }
    },
    formAddCancelBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor:"rgb(252, 144, 125)",
        "&:hover":{
            backgroundColor:"rgb(255, 189, 177)"
        },
        margin:"2%",
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem"
           }
    },
    statusBtn:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.2rem",
        backgroundColor:"mediumseagreen",
        "&:hover":{
            backgroundColor:"rgb(116, 228, 166)"
        },
        margin:"2%",
        padding:"0%",
        height:theme.spacing(5),
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem"
           }
    },
    ErrorPop:{
        fontFamily: "'Itim', cursive",
        fontSize:"1.5rem",
        fontSize:"1.5rem",
        color:"red",
        [theme.breakpoints.down('xs')]: {
            fontSize:"1rem",
          }
    },
    backdrop:{
        color: '#fff',
        zIndex:"100"
    },
}))

function AddEmployeeForm(props) {
    const classes=useStyles();
    const [firstName, setfirstName] = useState(props.employeeInfo ? props.employeeInfo[0].firstName:'' );
    const [lastName,setLastName]=useState(props.employeeInfo ? props.employeeInfo[0].lastName:'');
    const [phNo,setPhNo]=useState(props.employeeInfo ? props.employeeInfo[0].number:'');
    const [address,setAddress]=useState(props.employeeInfo ? props.employeeInfo[0].address:'');
    const [employeeId,setEmployeeId]=useState(props.employeeInfo ? props.employeeInfo[0].employeeId:'');
    const [qualification,setQualification]=useState(props.employeeInfo ? props.employeeInfo[0].qualification:'');
    const [activeValue,setActiveValue]=useState("");
    const [numberError,setNumberError]=useState(false);
    const [firstNameError,setfirstNameError]=useState(false);
    const [lastNameError,setLastNameError]=useState(false);
    const [employeeIdError,setEmployeeIderror]=useState(false);
    const [open,setOpen]=useState(false);
    const numberValidation=/^[0-9]{10}$/;
    // const [employeeData,setEmployeeData]=useState([]);
    // useEffect(() => {
    //    props?.employeeInfo && setfirstName(props.employeeInfo ? props.employeeInfo.firstName:'');
    // }, [])
    //  console.log(props.employeeInfo , 'passedinfo')
     console.log(firstName)
    const firstNameInput=(e=>{
            setfirstName(e.target.value); 
            // console.log(firstName) 
    });
    const statusAction=(e=>{
        setActiveValue(e.target.value);
    })
    // const EditFirstNameInput=(e=>{
    //     setfirstName(e.target.value);
    // });
    // const EditLastNameInput=(e=>{
    //     setLastName(e.target.value);
    // });
    // const EditPhNoInput=(e=>{
        // console.log((e.target.value));
        // e.preventDefault();
        // if(numberValidation.test(e.target.value)){
            // console.log("true");
        //    setPhNo(e.target.value);
    
        // else{
        //     setNumbererror(false);
        // }
    // });
    // const EditAddressInput=(e=>{
    //     setAddress(e.target.value);
    // });
    // const EditEmployeeIdInput=(e=>{
    //     setEmployeeId(e.target.value);
    // });
    // const EditQualificationInput=(e=>{
    //     setQualification(e.target.value);
    // });
    const lastNameInput=(e=>{
        setLastName(e.target.value);
    });
    const phNoInput=(e=>{
        if(e.target.value<9999999999){
            setPhNo(e.target.value);
        }
        else{
            setPhNo(phNo)
        }
    });
    const addressInput=(e=>{
        setAddress(e.target.value);
    });
    const employeeIdInput=(e=>{
        setEmployeeId(e.target.value);
    });
    const qualificationInput=(e=>{
        setQualification(e.target.value);
    })
    const cancelHandler=()=>{
        setOpen(true);
        setTimeout(()=>{
            setOpen(false)
        props.cancelHandler();
        },250);
    }
    const ErrorPopup=()=>{
        if(!firstName&&!lastName&&!numberValidation.test(phNo)&&!employeeId){
            setNumberError(true);
            setfirstNameError(true);
            setLastNameError(true);
            setEmployeeIderror(true);
        }
        else if(!firstName&&!lastName&&!numberValidation.test(phNo)){
            setNumberError(true);
            setfirstNameError(true);
            setLastNameError(true);
        }
        else if(!firstName&&!lastName){
            setfirstNameError(true);
            setLastNameError(true);
        }
        else if(!lastName&&!numberValidation.test(phNo)&&!employeeId){
            setNumberError(true);
            setLastNameError(true);
            setEmployeeIderror(true);
        }
        else if(!firstName&&!numberValidation.test(phNo)&&!employeeId){
            setNumberError(true);
            setfirstNameError(true);
            setEmployeeIderror(true);
        }
        else if(!numberValidation.test(phNo)&&!employeeId){
            setNumberError(true);
            setEmployeeIderror(true);
        }
        else if(!firstName&&lastName&&!employeeId){
            setfirstNameError(true);
            setLastNameError(true);
            setEmployeeIderror(true);
        }
        else if(!firstName){
            setfirstNameError(true);
        }
        else if(!lastName){
            setLastNameError(true);
        }
        else if(!employeeId){
            setEmployeeIderror(true);
        }
        else if(!numberValidation.test(phNo)){
            setNumberError(true);
        }
        else if(!numberValidation.test(phNo)&&!firstName){
            setNumberError(true);
            setfirstNameError(true);
        }
        else if(!numberValidation.test(phNo)&&!lastName){
            setfirstNameError(true);
            setLastNameError(true);
        }
        else if(!employeeId&&!firstName){
            setfirstNameError(true);
            setEmployeeIderror(true);
        }
        else if(!employeeId&&!lastName){
            setLastNameError(true);
            setEmployeeIderror(true);
        }
    }
    const editEmployee=(e)=>{
            e.preventDefault();
            if(firstName&&lastName&&numberValidation.test(phNo)&&employeeId){
                const editedData={
                    firstName:firstName,
                    lastName:lastName,
                    number:phNo,
                    address:address,
                    employeeId:employeeId,
                    status:activeValue?activeValue:"active",
                    qualification:qualification,
                    id:props.employeeInfo[0].id
                    }
                    setOpen(true);
                        setTimeout(()=>{
                        setOpen(false)
                    props.employeeInfoUpdated(editedData);
                    props.cancelHandler();
                },250);
                }
                else{
                    ErrorPopup();
                }
        }

    const addEmployee=(e)=>{
        e.preventDefault();
        if(firstName&&lastName&&numberValidation.test(phNo)&&employeeId){
        const data={
            firstName:firstName,
            lastName:lastName,
            number:phNo,
            address:address,
            employeeId:employeeId,
            status:"active",
            qualification:qualification,
            id:Math.random().toString()*20
        }
        setOpen(true);
        setTimeout(()=>{
        setOpen(false)
        props.employeeData(data);
        props.cancelHandler();
        // setEmployeeData([...employeeData,data]);
        console.log(data);
    },250);
    }
    else {
        ErrorPopup();
    }
        // props.cancelHandler();
        // console.log(employeeDetail);
        // localStorage.setItem('demo',JSON.stringify([...employeeData,data]));
        // localStorage.setItem('demo',JSON.stringify(...employeeDetail,data))
        // props.cancelHandler();
        // props.employeeData();
    }

    return (
        <Container >
            <Backdrop className={classes.backdrop}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
            </Backdrop>
            <Card className={classes.formParent}>
                <Typography variant="h3" className={classes.formHeader}>Fill Data</Typography>
            <CardContent >
                 {/* <div className="formInput">
                <div> */}
                {/* {props.employeeInfo&&<label htmlFor="firstName" className="formInputLabel">first Name:</label>} */}
                <TextField variant="outlined" label="FirstName" margin="normal" fullWidth onChange={firstNameInput} value={firstName}></TextField>
                {firstNameError && <Typography className={classes.ErrorPop}>*please enter valid data</Typography>}
                {/* </div> 
                </div> */}
                {/* <div className="formInput">
                <div>
                {props.employeeInfo&&<label htmlFor="firstName" className="formInputLabel">last Name:</label>}
                </div> */}
                <TextField variant="outlined" label="LastName" margin="normal" fullWidth value={lastName}  onChange={lastNameInput}></TextField>
                {lastNameError && <Typography className={classes.ErrorPop}>*please enter valid data</Typography>}
                {/* </div> */}
                {/* 
                <div className="formInput">

                <div> */}
                {/* {props.employeeInfo&&<label htmlFor="firstName" className="formInputLabel">number:</label>}
                </div> */}
                <TextField type="number" fullWidth label="phone Number" margin="normal" variant="outlined" pattern="\d{10}" className={classes.phNo} value={phNo} onChange={phNoInput}></TextField >
                {numberError && <Typography className={classes.ErrorPop}>*please enter valid number</Typography>}
                {/* </div> */}

                {/* <div className="formInput"> 
                <div>
                {props.employeeInfo&&<label htmlFor="firstName" className="formInputLabel">address:</label>}</div> */}
                <TextField variant="outlined" label="address" margin="normal" fullWidth value={address} onChange={addressInput}></TextField>
                {/* </div> */}
                {/* 
                <div className="formInput">
                
                <div>
                {props.employeeInfo&&<label htmlFor="firstName" >employee Id:</label>}
                </div> */}
                <TextField variant="outlined" label="employeeId" margin="normal" fullWidth value={employeeId} onChange={employeeIdInput}></TextField>
                {employeeIdError && <Typography className={classes.ErrorPop}>*please enter valid Id</Typography>}
                {/* </div> */}
                
                {/* <div className="formInput">
                <div>
                {props.employeeInfo&&<label htmlFor="firstName" className="formInputLabel">qualification:</label>}
                </div> */}
                <TextField variant="outlined" label="qualification" margin="normal" fullWidth value={qualification}  onChange={qualificationInput}></TextField>
                
                {/* </div> */}

            </CardContent>
            <Box className={classes.formAdd}>
                <Button className={classes.formAddCancelBtn} onClick={cancelHandler}>cancel</Button>
                {props.employeeInfo?<Button className={classes.formAddBtn} onClick={editEmployee}>edit</Button>:
                                    <Button className={classes.formAddBtn} onClick={addEmployee}>Add</Button>}
                {props.employeeInfo&&<FormControl>
                    <InputLabel id="demo-simple-select-helper-label">status</InputLabel>
                <Select name="status" labelId="demo-simple-select-helper-label" label="active" value={activeValue?activeValue:"active"} className={classes.statusBtn} onClick={statusAction}>
                        <MenuItem value="activate">active</MenuItem>
                        <MenuItem value="deactivate">deactive</MenuItem>    
                    </Select>
                    </FormControl>}
            </Box>
            </Card>
            </Container>
    )
}

export default AddEmployeeForm

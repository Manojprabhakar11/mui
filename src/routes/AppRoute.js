import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmployeeDetail from '../screens/employee/EmployeeDetail'
import Profile from '../screens/employee/Profile'
import FoodOrder from "../screens/foodorder/FoodOrder"
export default function AppRoute() {
    return (
        
        <Routes>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/employeeDetail" element={<EmployeeDetail/>}></Route>
            <Route path="/foodorder" element={<FoodOrder/>}></Route>
        </Routes>
        
    )
}

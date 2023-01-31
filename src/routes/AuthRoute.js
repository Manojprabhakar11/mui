import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '../auth/Login'

export default function AuthRoute() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/home" element={<Login/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
        </Routes>
    )
}

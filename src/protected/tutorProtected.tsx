import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Navigate, Outlet } from 'react-router-dom'

export default function tutorProtected() {

    const {tutorInfo}= useSelector((state:RootState)=>state.tutorAuth)


  return tutorInfo ? <Outlet/> : <Navigate to={"/tutor/tutorLogin"} replace/>
}

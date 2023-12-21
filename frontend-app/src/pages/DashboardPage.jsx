import React from 'react'
import NavbarPage from './NavbarPage'
import Table from '../components/Table'
// import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'


const DashboardPage = () => {

    return (
        <div className=''>
            <NavbarPage />
            <div className='container my-20 p-20 bg-base-300 rounded-badge'>
                <Table />
            </div>
        </div>
    )
}


export default DashboardPage
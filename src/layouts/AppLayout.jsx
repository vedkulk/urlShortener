import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>

    <main class="min-h-screen container p-5 ">
    <Header/>  
    <Outlet/>
    </main>

    </>
  )
}

export default AppLayout
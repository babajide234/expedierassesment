/* eslint-disable react/prop-types */
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'


export const Main = ({children}) => {
  return (
    <main className="">
        {children}
    </main>
  )
}

const MainLayout = () => {
  return (
    <>
        <Navbar/>
        
        <Outlet/>
        <Footer/>
    </>
  )
}

export default MainLayout
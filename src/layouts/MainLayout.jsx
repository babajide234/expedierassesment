/* eslint-disable react/prop-types */
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import useUserStore from '../store/userStore'
import useAuthStore from '../store/authStore'
import { getCookie } from '../util/functions'
import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'


export const Main = ({children}) => {
  return (
    <main className="">
        {children}
    </main>
  )
}

const MainLayout = () => {
  const setUser = useUserStore((state) => state.setUser);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const token = getCookie('token');

  useEffect(() => {
    if (token && isLoggedIn) {
      console.log("token",token)
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, [isLoggedIn, token]);

  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default MainLayout
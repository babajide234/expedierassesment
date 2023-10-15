/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCart, getCookie, setCookie } from "../util/functions";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";
import { FaShoppingCart, FaHome } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineClose } from 'react-icons/md';
import useNavbarStore from "../store/navbarStore";
import { motion } from 'framer-motion';
import useAuthStore from "../store/authStore";
import useUserStore from "../store/userStore";

const Navbar = () => {
    const user = useUserStore((state) => state.user);

    const isNavbarOpen = useNavbarStore((state) => state.isNavbarOpen);
    const toggleNavbar = useNavbarStore((state) => state.toggleNavbar);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const Logout = useAuthStore((state) => state.Logout);

    const token = getCookie('token');

    
    const { data: cart, isLoading: isCartLoading } = useQuery(['cart', token], () => getCart(user.sub),{
        enabled: user !== null && user !== undefined,
    });

    const handleLogout = () => {
        setCookie('token', '', new Date(0));
        Logout();
    }

    const getCartNumber = ()=> {
        if (cart) {
            return cart.reduce((total, order) => {
                return total + order.products.reduce((sum, product) => {
                    return sum + product.quantity;
                }, 0);
            }, 0);
        } else {
            return 0;
        }
    }

    const handleMenuToggle = ()=> {
        toggleNavbar();
    };
  return (
    <>
        <div className=" w-[90%] md:w-[80%] z-50 sticky top-5 mx-auto rounded-full bg-white/20 shadow-lg py-5 px-10 bg-opacity-20 backdrop-blur-[30px] ">
            <div className={` hidden md:flex justify-between items-center`}>

                <Menu/>
                <Link to="/cart" className=" hover:bg-neutral/20 w-10 h-10 flex justify-center items-center rounded-full relative  text-lg font-bold text-neutral ">
                    <FaShoppingCart className=" text-lg"/>
                    <span className=" absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full bg-primary ml-3 text-neutral flex justify-center items-center">{getCartNumber()}</span>
                </Link>
                    {
                        isLoggedIn? (
                            <div className=" flex items-center  px-5 rounded-full">
                                <span className=" font-semibold text-neutral mr-2">{user.user}</span>
                                <Link to="/" onClick={handleLogout} className="hover:bg-neutral/20 w-10 h-10 flex justify-center items-center rounded-full relative text-lg font-bold text-neutral">
                                    <BiLogOut/>
                                </Link>
                            </div>
                        ) : (
                            <Link to="/login" className=" relative px-5 py-2 text-lg font-bold text-neutral flex items-center">Login</Link>
                        )
                    }
            </div>
            <div className=" w-full flex md:hidden justify-between">
                
                <Link to="/" className=" hover:bg-neutral/20 w-8 h-8 flex justify-center items-center rounded-full relative  text-lg font-bold text-neutral ">
                    <FaHome className=" text-2xl"/>
                </Link>

                <Link to="/cart" className=" hover:bg-neutral/20 w-8 h-8 flex justify-center items-center rounded-full relative  text-lg font-bold text-neutral ">
                    <FaShoppingCart className=" text-lg"/>
                    <span className=" absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full bg-primary ml-3 text-neutral flex justify-center items-center">{getCartNumber()}</span>
                </Link>
                <button onClick={handleMenuToggle} className=" hover:bg-neutral/20 w-8 h-8 flex justify-center items-center rounded-full relative  text-3xl font-bold text-neutral ">
                    { isNavbarOpen ? <MdOutlineClose/> :<GiHamburgerMenu/> }
                </button>
            </div>
        </div>
        <motion.div 
            initial={  { opacity: 0,  y: "-100%", x: "50", height: 0 } }
            animate={isNavbarOpen ? { opacity: 1, y: 120, x:18,height: "70%" }:{ opacity: 0, y: "-100%", } }
            exit={{ opacity: 0,  y: "-100%"}}
            className=" fixed inset-0 h-[70vh] rounded-2xl p-5 bg-neutral z-50  w-[90%]">
            <div className=" flex flex-col justify-center h-full w-full items-center">
                <Link onClick={handleMenuToggle} to="/" className=" flex justify-between items-center text-3xl mb-5 last-of-type:mb-0 font-bold text-secondary">
                    <FaHome className=" text-2xl mr-3"/>
                    Home
                </Link>
                {
                    isLoggedIn? (
                        <Link to="/" onClick={handleLogout} className="hover:bg-neutral/20  flex justify-center items-center rounded-full relative text-lg font-bold text-secondary">
                            <BiLogOut className=" text-2xl mr-3"/> <span className=" text-3xl">Logout</span>
                        </Link>
                    ) : (
                        <Link onClick={handleMenuToggle} to="/login" className=" text-3xl mb-5 last-of-type:mb-0 font-bold text-secondary">Login</Link>
                    )
                }
            </div>
        </motion.div>
    </>
  )
}

const Menu = ()=>{
    const menu_item = [
        {
            id: 1,
            title: 'Home',
            link: '/'
        }
    ]
    return (
            <ul className="flex ">
                {
                    menu_item.map((item, index) => {
                        return (
                            <li className="" key={index}>
                                <Link to={item.link} className=" text-lg capitalize text-neutral hover:bg-neutral/10 hover:text-primary rounded-xl px-5 py-2 font-bold">{item.title}</Link>
                            </li>
                        )
                    })
                }
            </ul>
    )
}
export default Navbar
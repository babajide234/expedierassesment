import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCart, getCookie, setCookie } from "../util/functions";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";

const Navbar = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ user, setUser ] = useState({});
    const token = getCookie('token');
    // get user cart usequery

    const { data: cart, isLoading: isCartLoading } = useQuery(['cart', token], () => getCart(user.sub),{
        enabled: token!== "",
    });

    useEffect(() => {

        if (token && !isLoggedIn) {
            const decoded = jwtDecode(token);
            setIsLoggedIn(!isLoggedIn)
            setUser(decoded);
            console.log(decoded);
        }
    },[isLoggedIn, token])

    const handleLogout = () => {
        setCookie('token', '', new Date(0));
        setIsLoggedIn(false);
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
  return (
    <div className=" w-[80%] z-50 sticky top-5 mx-auto rounded-full bg-white/20 shadow-lg py-5 px-10 bg-opacity-20 backdrop-blur-[30px] flex justify-between items-center">
        <Menu/>
        <Link to="/cart" className=" relative px-5 py-2 text-lg font-bold text-neutral flex items-center">
            Cart 
            <span className=" w-5 h-5 rounded-full bg-neutral ml-3 text-primary flex justify-center items-center">{getCartNumber()}</span>
        </Link>
        {
            isLoggedIn? (
                <div className=" flex items-center  px-5 rounded-full">
                    <span className=" font-semibold text-neutral">{user.user}</span>
                    <Link to="/" onClick={handleLogout} className=" relative px-5 py-2 text-lg font-bold text-neutral flex items-center">Logout</Link>
                </div>
            ) : (
                <Link to="/login" className=" relative px-5 py-2 text-lg font-bold text-neutral flex items-center">Login</Link>
            )
        }
    </div>
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
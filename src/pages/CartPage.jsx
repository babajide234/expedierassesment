import { deleteCart, getCart, getCookie, getProductById } from "../util/functions";
import { useMutation, useQuery } from "react-query";
import jwtDecode from "jwt-decode";
import Container from "../components/Container";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartPage = () => {
    const token = getCookie('token');
    const decoded = jwtDecode(token);

    const { data: cart, isLoading: isCartLoading, refetch: refetchCart } = useQuery(['cart'], () => getCart(decoded.sub),{
        enabled: token!== "",
    });

    const deletecart = useMutation((payload) => deleteCart(payload),{
        onSuccess: (data) => {
            console.log(data)
            toast.success('cart deleted successfully');
            refetchCart()
        },
        onError: (error) => {
            console.log(error);
        }
    });
    const [productNames, setProductNames] = useState([]);

    useEffect(() => {
        if (cart) {
            const fetchProductNames = async () => {
                const names = await Promise.all(
                    cart[0]?.products.map(async (product) => {
                        const name = await getproductName(product.productId);
                        return name;
                    })
                );
                setProductNames(names);
            };
            fetchProductNames();
        }
    }, [cart]);

    const getproductName = async (id) => {
        const data = await getProductById(id);
        return data?.title;
    }
    
  return (
    <div className="w-full py-20">
    <Container>
        <div className="mi-h-80 bg-slate-400 backdrop-blur-[30px] rounded-3xl py-5 px-10 flex gap-5">
            {
                isCartLoading? (
                        Array.from({ length: 4 }, (_, index) => (
                            <div
                            key={`loading_${index}`}
                            className="bg-gray-300/20 animate-pulse w-full p-5 rounded-full"
                            ></div>
                        ))
                    
                ) : (
                    <>
                        <div className="w-full">
                            <div className="grid grid-cols-5 colu text-center  justify-between items-center bg-neutral py-3 px-5 rounded-lg w-full mb-5">
                                <h3 className="font-bold col-span-3 ">Product</h3>
                                <h3 className="font-bold ">Quantity</h3>
                                <h3 className="font-bold ">Action</h3>
                            </div>
                                {
                                    cart && cart[0]?.products.map( (product, index)=>(
                                        <div key={product.productId} className=" grid grid-cols-5 text-center justify-between items-center bg-neutral py-3 px-5 rounded-lg w-full mb-5">
                                            <h2 className="col-span-3">{productNames[index]}</h2>
                                                <p className="">{product.quantity}</p>
                                                <Button onClick={()=>deletecart.mutate(product.productId)} loading={deletecart.isLoading}>Delete</Button>
                                        </div>
                                    ))
                                }
                        </div>
                    </>
                )
            }


        </div>
    </Container>
    </div>
  )
}

export default CartPage